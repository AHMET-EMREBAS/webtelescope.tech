(self.webpackChunk_webpackages_source=self.webpackChunk_webpackages_source||[]).push([[521],{"./libs/form/src/lib/form/form.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{U:()=>FormComponent,x:()=>CommonFormModule});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/tslib@2.6.2/node_modules/tslib/tslib.es6.mjs"),_form_style_scss_ngResource__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./libs/form/src/lib/form/form.style.scss?ngResource"),_form_style_scss_ngResource__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(_form_style_scss_ngResource__WEBPACK_IMPORTED_MODULE_8__),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@angular+core@17.0.4_rxjs@7.8.1_zone.js@0.14.2/node_modules/@angular/core/fesm2022/core.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@angular+forms@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/forms/fesm2022/forms.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),_angular_common__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@angular+common@17.0.4_@angular+core@17.0.4_rxjs@7.8.1/node_modules/@angular/common/fesm2022/common.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/icon.mjs"),_angular_material_button__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/button.mjs"),_angular_material_card__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/card.mjs");let CommonFormModule=class CommonFormModule{};CommonFormModule=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({exports:[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,_angular_forms__WEBPACK_IMPORTED_MODULE_3__.u5,_angular_forms__WEBPACK_IMPORTED_MODULE_3__.UX,_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.Ps,_angular_material_button__WEBPACK_IMPORTED_MODULE_5__.ot,_angular_material_card__WEBPACK_IMPORTED_MODULE_6__.QW]})],CommonFormModule);let FormComponent=class FormComponent{constructor(formGroup){this.formTitle="Form Title",this.submitLabel="Submit",this.isUpdateForm=!1,this.submitEvent=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter,this.isSubmitted$=new rxjs__WEBPACK_IMPORTED_MODULE_7__.X(!1),this.formGroup=formGroup}submitForm(value){this.isSubmitted$.next(!0),this.submitEvent.emit(value??this.formGroup.value)}resetForm(){this.isSubmitted$.next(!1),this.formGroup.reset()}static#_=this.ctorParameters=()=>[{type:_angular_forms__WEBPACK_IMPORTED_MODULE_3__.cw}];static#_2=this.propDecorators={formTitle:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],submitLabel:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],isUpdateForm:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],submitEvent:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Output}]}};FormComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({selector:"wt-form",standalone:!0,imports:[CommonFormModule],template:'\n    <mat-card>\n      <mat-card-header>\n        <mat-card-title>\n          <h1>{{ formTitle }}</h1>\n        </mat-card-title>\n      </mat-card-header>\n      <mat-card-content>\n        <form\n          style="display: flex; flex-direction: column; gap: 1em;  width: 100%;"\n          #form="ngForm"\n          novalidate\n          [formGroup]="formGroup"\n        >\n          <ng-content></ng-content>\n        </form>\n      </mat-card-content>\n\n      <mat-card-actions>\n        <div style="display: flex; flex-direction: row; gap: 1em;">\n          <button\n            mat-raised-button\n            color="primary"\n            type="button"\n            (click)="submitForm()"\n            [disabled]="formGroup.invalid"\n            [attr.data-testid]="submitLabel"\n          >\n            {{ submitLabel }}\n          </button>\n          <button\n            mat-raised-button\n            (click)="resetForm()"\n            type="button"\n            [attr.data-testid]="\'Reset\'"\n          >\n            Reset\n          </button>\n        </div>\n      </mat-card-actions>\n    </mat-card>\n  ',styles:[_form_style_scss_ngResource__WEBPACK_IMPORTED_MODULE_8___default()]}),(0,tslib__WEBPACK_IMPORTED_MODULE_0__.w6)("design:paramtypes",[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.cw])],FormComponent)},"./libs/form/src/lib/form/form.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Heading:()=>Heading,Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var C_Users_aemre_Projects_webtelescope_tech_node_modules_pnpm_babel_runtime_7_23_2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@storybook+angular@7.5.3_@angular-devkit+architect@0.1700.3_@angular-devkit+build-angular@17._u5b7dw7mqoq4ihk2axqguryska/node_modules/@storybook/angular/dist/index.mjs"),_form__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/form/src/lib/form/form.ts"),_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@storybook+testing-library@0.2.2/node_modules/@storybook/testing-library/dist/index.mjs"),_storybook_jest__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/.pnpm/@storybook+jest@0.2.3_jest@29.7.0_vitest@0.34.6/node_modules/@storybook/jest/dist/index.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@angular+platform-browser@17.0.4_@angular+animations@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4/node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@angular+forms@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/forms/fesm2022/forms.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@angular+core@17.0.4_rxjs@7.8.1_zone.js@0.14.2/node_modules/@angular/core/fesm2022/core.mjs");const __WEBPACK_DEFAULT_EXPORT__={component:_form__WEBPACK_IMPORTED_MODULE_2__.U,title:"FormComponent",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.BrowserAnimationsModule),{provide:_angular_forms__WEBPACK_IMPORTED_MODULE_5__.cw,useValue:new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.cw({name:new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NI("",[])})}]})]},Primary={args:{}},Heading={args:{},play:(_ref=(0,C_Users_aemre_Projects_webtelescope_tech_node_modules_pnpm_babel_runtime_7_23_2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__.Z)((function*({canvasElement}){const canvas=(0,_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.uh)(canvasElement);(0,_storybook_jest__WEBPACK_IMPORTED_MODULE_7__.l)(canvas.getByTestId("Submit")).toBeTruthy()})),function play(_x){return _ref.apply(this,arguments)})};var _ref},"./node_modules/.pnpm/css-loader@6.8.1_webpack@5.89.0/node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/.pnpm/css-loader@6.8.1_webpack@5.89.0/node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./libs/form/src/lib/form/form.style.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/.pnpm/css-loader@6.8.1_webpack@5.89.0/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/.pnpm/css-loader@6.8.1_webpack@5.89.0/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"button {\n  min-width: 150px;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"?5370":()=>{}}]);