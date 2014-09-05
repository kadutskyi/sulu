<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Rest\ListBuilder\Doctrine;

use Doctrine\ORM\EntityManager;
use Sulu\Component\Rest\ListBuilder\AbstractListBuilder;
use Sulu\Component\Rest\ListBuilder\Doctrine\FieldDescriptor\AbstractDoctrineFieldDescriptor;
use Sulu\Component\Rest\ListBuilder\Doctrine\FieldDescriptor\DoctrineJoinDescriptor;

/**
 * The listbuilder implementation for doctrine
 * @package Sulu\Component\Rest\ListBuilder\Doctrine
 */
class DoctrineListBuilder extends AbstractListBuilder
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * The name of the entity to build the list for
     * @var string
     */
    private $entityName;

    /**
     * @var AbstractDoctrineFieldDescriptor[]
     */
    protected $fields = array();

    /**
     * @var AbstractDoctrineFieldDescriptor[]
     */
    protected $searchFields = array();

    /**
     * @var AbstractDoctrineFieldDescriptor
     */
    protected $sortField;

    /**
     * @var \Doctrine\ORM\QueryBuilder
     */
    protected $queryBuilder;


    public function __construct(EntityManager $em, $entityName)
    {
        $this->em = $em;
        $this->entityName = $entityName;
    }

    /**
     * {@inheritDoc}
     */
    public function count()
    {
        $entityId = $this->entityName . '.id';
        $this->queryBuilder = $this->createQueryBuilder()
            ->select('count(' . $entityId . ')');

        return $this->queryBuilder->getQuery()->getSingleScalarResult();
    }

    /**
     * {@inheritDoc}
     */
    public function execute()
    {
        $this->queryBuilder = $this->createQueryBuilder();

        foreach ($this->fields as $field) {
            $this->queryBuilder->addSelect($field->getSelect() . ' AS ' . $field->getName());
        }

        if ($this->limit != null) {
            $this->queryBuilder->setMaxResults($this->limit)->setFirstResult($this->limit * ($this->page - 1));
        }

        if ($this->sortField != null) {
            $this->queryBuilder->orderBy($this->sortField->getName(), $this->sortOrder);
        }

        return $this->queryBuilder->getQuery()->getArrayResult();
    }

    /**
     * Returns all the joins required for the query
     * @return DoctrineJoinDescriptor[]
     */
    private function getJoins()
    {
        $joins = array();

        if ($this->sortField != null) {
            $joins = array_merge($joins, $this->sortField->getJoins());
        }

        foreach ($this->fields as $field) {
            $joins = array_merge($joins, $field->getJoins());
        }

        foreach ($this->searchFields as $searchField) {
            $joins = array_merge($joins, $searchField->getJoins());
        }

        foreach ($this->whereFields as $whereField) {
            $joins = array_merge($joins, $whereField->getJoins());
        }

        foreach ($this->whereNotFields as $whereNotField) {
            $joins = array_merge($joins, $whereNotField->getJoins());
        }

        return $joins;
    }

    /**
     * @return \Doctrine\ORM\QueryBuilder
     */
    private function createQueryBuilder()
    {
        $this->queryBuilder = $this->em->createQueryBuilder()
            ->from($this->entityName, $this->entityName);

        foreach ($this->getJoins() as $entity => $join) {
            switch ($join->getJoinMethod()) {
                case DoctrineJoinDescriptor::JOIN_METHOD_LEFT:
                    $this->queryBuilder->leftJoin(
                        $join->getJoin(),
                        $entity,
                        $join->getJoinConditionMethod(),
                        $join->getJoinCondition()
                    );
                    break;
                case DoctrineJoinDescriptor::JOIN_METHOD_INNER:
                    $this->queryBuilder->innerJoin(
                        $join->getJoin(),
                        $entity,
                        $join->getJoinConditionMethod(),
                        $join->getJoinCondition()
                    );
                    break;
            }
        }

        // set where
        if (!empty($this->whereFields)) {
            $this->addWheres($this->whereFields, $this->whereValues, self::WHERE_COMPARATOR_EQUAL);
        }

        // set where not
        if (!empty($this->whereNotFields)) {
            $this->addWheres($this->whereNotFields, $this->whereNotValues, self::WHERE_COMPARATOR_UNEQUAL);
        }

        if ($this->search != null) {
            $searchParts = array();
            foreach ($this->searchFields as $searchField) {
                $searchParts[] = $searchField->getSelect() . ' LIKE :search';
            }

            $this->queryBuilder->andWhere('(' . implode(' OR ', $searchParts) . ')');
            $this->queryBuilder->setParameter('search', '%' . $this->search . '%');
        }

        return $this->queryBuilder;
    }

    /**
     * sets where statement
     * @param array $whereFields
     * @param array $whereValues
     * @param string $comparator
     */
    protected function addWheres(array $whereFields, array $whereValues, $comparator = self::WHERE_COMPARATOR_EQUAL)
    {
        $whereParts = array();
        foreach ($whereFields as $whereField) {
            $actualComparator = $comparator;
            $value = $whereValues[$whereField->getName()];

            if ($value === null) {
                if ($comparator == self::WHERE_COMPARATOR_EQUAL) {
                    $actualComparator = 'IS NULL';
                } elseif ($comparator == self::WHERE_COMPARATOR_UNEQUAL) {
                    $actualComparator = 'IS NOT NULL';
                }
                $whereParts[] = $whereField->getSelect() . ' ' . $actualComparator;
            } else {
                $whereParts[] = $whereField->getSelect() . ' ' . $actualComparator . ' :' . $whereField->getName();
                $this->queryBuilder->setParameter($whereField->getName(), $value);
            }
        }
        $this->queryBuilder->andWhere('(' . implode(' AND ', $whereParts) . ')');
    }
}
