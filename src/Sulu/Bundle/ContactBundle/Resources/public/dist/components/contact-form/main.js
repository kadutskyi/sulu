define(["text!sulucontact/components/contact-form/address.form.html"],function(a){"use strict";var b={fields:["address","email","fax","phone","url"],fieldTypes:[],defaultTypes:[],trigger:".contact-options-toggle"},c={fieldId:"field-select",fieldTypeId:"field-type-select",editDeleteSelector:".delete",editDeleteIcon:"icon-circle-minus",editUndoDeleteIcon:"icon-circle-plus",fadedClass:"faded",addressFormId:"#address-form",dropdownContainerId:"#contact-options-dropdown",addressRowTemplateSelector:'[data-mapper-property-tpl="address-tpl"]'},d={add:['<div class="grid-row">','   <div id="'+c.fieldId+'" class="grid-col-6"></div>','   <div id="'+c.fieldTypeId+'" class="grid-col-6"></div>',"</div>",'<div class="grid-row m-bottom-0"></div>'].join(""),editField:['<div class="grid-row divider" data-deleted="false">','   <div class="grid-col-7 pull-left">','       <div id="<%= dropdownId %>"></div>',"   </div>",'   <div class="grid-col-2 pull-right">',"<% if (showDeleteButton == true) { %>",'       <div class="delete btn gray-dark fit only-icon pull-right">','           <div class="icon-circle-minus"></div>',"       </div>","<% } %>","   </div>","</div>"].join("")},e="sulu.contact-form",f=function(){return e+".initialized"},g=function(){return e+".changed"},h=function(){this.sandbox.on("sulu.contact-form.add-collectionfilters",o.bind(this)),this.sandbox.on("sulu.contact-form.add-required",p.bind(this)),this.sandbox.on("sulu.contact-form.is.initialized",r.bind(this)),j.call(this)},i=function(){this.sandbox.dom.on(this.$el,"click",u.bind(this),c.addressRowTemplateSelector)},j=function(){this.sandbox.on("husky.dependent-select.add-fields.all.items.selected",function(){this.sandbox.emit("husky.overlay.add-fields.okbutton.activate")}.bind(this)),this.sandbox.on("husky.dependent-select.add-fields.all.items.deselected",function(){this.sandbox.emit("husky.overlay.add-fields.okbutton.deactivate")}.bind(this))},k=function(){null!==this.$editOverlayContent&&this.sandbox.dom.on(this.sandbox.dom.find(".grid-row",this.$editOverlayContent),"click",l.bind(this),c.editDeleteSelector)},l=function(a){var b=this.sandbox.dom.$(a.delegateTarget),d=this.sandbox.dom.find('[class^="icon"]',a.currentTarget),e=JSON.parse(this.sandbox.dom.attr(b,"data-deleted"));e===!0?(this.sandbox.dom.removeClass(b,c.fadedClass),this.sandbox.dom.removeClass(d,c.editUndoDeleteIcon),this.sandbox.dom.prependClass(d,c.editDeleteIcon),this.sandbox.dom.attr(b,"data-deleted","false")):(this.sandbox.dom.addClass(b,c.fadedClass),this.sandbox.dom.removeClass(d,c.editDeleteIcon),this.sandbox.dom.prependClass(d,c.editUndoDeleteIcon),this.sandbox.dom.attr(b,"data-deleted","true"))},m=function(){this.sandbox.dom.off(this.$editOverlayContent)},n=function(){this.sandbox.form.removeCollectionFilter(this.form,"addresses"),this.sandbox.form.removeCollectionFilter(this.form,"emails"),this.sandbox.form.removeCollectionFilter(this.form,"phones"),this.sandbox.form.removeCollectionFilter(this.form,"urls"),this.sandbox.form.removeCollectionFilter(this.form,"faxes"),this.sandbox.form.removeCollectionFilter(this.form,"notes")},o=function(a){this.form=a,this.sandbox.form.addCollectionFilter(this.form,"addresses",function(a){return""===a.id&&delete a.id,""!==a.city}),this.sandbox.form.addCollectionFilter(this.form,"emails",function(a){return""===a.id&&delete a.id,""!==a.email}),this.sandbox.form.addCollectionFilter(this.form,"phones",function(a){return""===a.id&&delete a.id,""!==a.phone}),this.sandbox.form.addCollectionFilter(this.form,"urls",function(a){return""===a.id&&delete a.id,""!==a.url}),this.sandbox.form.addCollectionFilter(this.form,"faxes",function(a){return""===a.id&&delete a.id,""!==a.fax}),this.sandbox.form.addCollectionFilter(this.form,"notes",function(a){return""===a.id&&delete a.id,""!==a.value})},p=function(a){var b,c={email:"email-tpl"},d='#contact-fields *[data-mapper-property-tpl="<%= selector %>"]:first';-1!==a.indexOf("email")&&(b=this.sandbox.util.template(d,{selector:c.email}),this.sandbox.form.addConstraint(this.form,b+" input.email-value","required",{required:!0}),this.sandbox.dom.addClass(b+" label span:first","required"),this.sandbox.dom.attr(b,"data-contactform-required",!0))},q=function(a,b){for(var c=-1,d=a.length;++c<d;)if(a[c].id===b)return a[c]},r=function(a){this.initialized?a.call(this):this.sandbox.on("sulu.contact-form.initialized",function(){a.call(this)}.bind(this))},s=function(){var a,b,d,e=this.sandbox.dom.children("#"+c.fieldId)[0],f=this.sandbox.dom.children("#"+c.fieldTypeId)[0],g=this.sandbox.dom.data(e,"selection"),h=this.sandbox.dom.data(f,"selection");a=this.dropdownDataArray[g],b=q(this.dropdownDataArray[g].items,h),d={},d[a.type]="",d[a.type+"Type"]={id:h,name:b.name},d.attributes={},"address"===a.type?B.call(this,d):this.sandbox.form.addToCollection(this.form,a.collection,d),this.sandbox.emit("husky.overlay.add-fields.remove")},t=function(){var a,b,c,d,e,f;for(a=-1,b=this.editFieldsData.length;++a<b;)f=JSON.parse(this.sandbox.dom.attr(this.editFieldsData[a].$element,"data-deleted")),f===!0?(this.sandbox.form.removeFromCollection(this.form,this.editFieldsData[a].mapperId),this.sandbox.emit(g.call(this))):(c=parseInt(this.sandbox.dom.attr(this.editFieldsData[a].$dropdown,"data-selection"),10),c!==this.editFieldsData[a].type.id&&(d=v.call(this,this.editFieldsData[a].types,c),null!==d&&(e={},e[this.editFieldsData[a].typeName]=d,this.sandbox.form.editInCollection(this.form,this.editFieldsData[a].mapperId,e),this.sandbox.emit(g.call(this)))));m.call(this),this.sandbox.stop(this.$editOverlayContent)},u=function(a){var b=this.sandbox.dom.$(a.currentTarget),c=this.sandbox.form.getData(this.form,!0,b);B.call(this,c,this.sandbox.dom.data(b,"mapperId"))},v=function(a,b){for(var c=-1,d=a.length;++c<d;)if(a[c].id===b)return a[c];return null},w=function(){var a,b,c,d=this.options.fieldTypes;for(c in d)for(a=-1,b=d[c].length;++a<b;)d[c][a].name=this.sandbox.translate(d[c][a].name);this.options.translatedFieldTypes=d},x=function(){this.editFieldsData=[],n.call(this);var a,b,c,e,f,g,h,i=this.sandbox.form.getData(this.form,!0),j=this.sandbox.dom.createElement('<div class="edit-fields"/>');o.call(this,this.form),a={address:i.addresses,email:i.emails,fax:i.faxes,phone:i.phones,url:i.urls};for(e in a)for(b=-1,c=a[e].length;++b<c;)g=this.sandbox.dom.attr(this.sandbox.dom.$('[data-mapper-id="'+a[e][b].mapperId+'"]'),"data-contactform-required"),h=!1,a[e][b].attributes&&a[e][b].attributes.permanent&&(h=a[e][b].attributes.permanent),f=this.sandbox.dom.createElement(this.sandbox.util.template(d.editField)({dropdownId:"edit-dropdown-"+e+"-"+b,showDeleteButton:!g&&!h})),this.editFieldsData.push({id:a[e][b].id,typeName:e+"Type",type:a[e][b][e+"Type"],name:this.sandbox.translate("public."+e),$element:f,dropdownId:"edit-dropdown-"+e+"-"+b,types:this.options.fieldTypes[e],mapperId:parseInt(a[e][b].mapperId),dropdownData:null,$dropdown:null}),this.sandbox.dom.append(j,f);return j},y=function(){var a,b,c,d;for(a=-1,b=this.editFieldsData.length;++a<b;)for(this.editFieldsData[a].dropdownData=[],c=-1,d=this.editFieldsData[a].types.length;++c<d;)this.editFieldsData[a].dropdownData.push({id:this.editFieldsData[a].types[c].id,name:this.editFieldsData[a].name+" ("+this.editFieldsData[a].types[c].name+")"})},z=function(){y.call(this);for(var a=-1,b=this.editFieldsData.length;++a<b;)this.editFieldsData[a].$dropdown=this.sandbox.dom.find("#"+this.editFieldsData[a].dropdownId,this.editFieldsData[a].$element),this.sandbox.start([{name:"select@husky",options:{el:this.editFieldsData[a].$dropdown,instanceName:this.editFieldsData[a].dropdownId,data:this.editFieldsData[a].dropdownData,preSelectedElements:[this.editFieldsData[a].type.id]}}])},A=function(){var a=this.sandbox.dom.createElement("<div>");this.sandbox.dom.append("body",a),this.$editOverlayContent=x.call(this),this.sandbox.start([{name:"overlay@husky",options:{el:a,title:this.sandbox.translate("public.edit-fields"),openOnStart:!0,removeOnClose:!0,instanceName:"edit-fields",data:this.$editOverlayContent,okCallback:t.bind(this),closeCallback:m.bind(this)}}]),z.call(this),k.call(this)},B=function(b,d){var e,f,g,h,i=b?!1:!0;this.sandbox.emit("husky.overlay.add-fields.remove"),this.sandbox.emit("husky.overlay.edit-fields.remove"),this.sandbox.util.extend(!0,b,{translate:this.sandbox.translate,countries:this.options.fieldTypes.countries}),e=this.sandbox.util.template(a,b),g=this.sandbox.dom.createElement("<div>"),this.sandbox.dom.append("body",g),h=this.sandbox.translate(i?"contacts.add-address":"contacts.edit-address"),this.sandbox.start([{name:"overlay@husky",options:{el:g,title:h,openOnStart:!0,removeOnClose:!0,instanceName:"add-address",data:e,skin:"wide",okCallback:D.bind(this,d),closeCallback:C.bind(this)}}]),this.sandbox.on("husky.overlay.add-address.opened",function(){f=this.sandbox.form.create(c.addressFormId),f.initialized.then(function(){this.sandbox.form.setData(c.addressFormId,b)}.bind(this))}.bind(this))},C=function(){this.sandbox.dom.off(c.addressFormId)},D=function(a){var b;return this.sandbox.form.validate(c.addressFormId)?(b=this.sandbox.form.getData(c.addressFormId,!0),a?this.sandbox.form.editInCollection(this.form,a,b):this.sandbox.form.addToCollection(this.form,"addresses",b),this.sandbox.emit(g.call(this)),void C.call(this)):!1},E=function(){var a,b,e={};this.dropdownDataArray=[],this.$addOverlay=this.sandbox.dom.createElement(d.add),this.sandbox.util.foreach(this.options.fields,function(b,c){if(!this.options.fieldTypes||!this.options.fieldTypes[b])throw"contact-form@sulu: fieldTypes not defined for type "+b;a={id:c,name:this.sandbox.translate("public."+b),type:b,collection:b+"s",items:this.options.translatedFieldTypes[b]},e[b]=a}.bind(this)),e.fax.collection="faxes",this.dropdownDataArray=Object.keys(e).map(function(a){return e[a]}),b=this.sandbox.dom.createElement("<div>"),this.sandbox.dom.append("body",b),this.sandbox.start([{name:"overlay@husky",options:{el:b,title:this.sandbox.translate("public.add-fields"),openOnStart:!0,removeOnClose:!0,instanceName:"add-fields",okInactive:!0,data:this.$addOverlay,okCallback:s.bind(this)}},{name:"dependent-select@husky",options:{el:this.$addOverlay,singleSelect:!0,data:this.dropdownDataArray,instanceName:"add-fields",container:["#"+c.fieldId,"#"+c.fieldTypeId]}}])};return{initialize:function(){this.initialized=!1,this.$editOverlayContent=null,this.form=null,this.$addOverlay=null,this.dropdownDataArray=[],this.editFieldsData=[],this.options=this.sandbox.util.extend(!0,{},b,this.options),w.call(this),this.render(),h.call(this),i.call(this),this.sandbox.emit(f.call(this)),this.initialized=!0},render:function(){var a=this.sandbox.dom.createElement('<div id="contact-form-options-container" />'),b=this.$find(c.dropdownContainerId);this.sandbox.dom.append(b,a),this.sandbox.start([{name:"dropdown@husky",options:{trigger:b,triggerOutside:!0,el:a,alignment:"right",shadow:!0,toggleClassOn:b,data:[{id:1,name:"public.edit-fields",callback:A.bind(this)},{id:2,name:"public.add-fields",callback:E.bind(this)}]}}])}}});