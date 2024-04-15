(self.webpackChunk_webpackages_source=self.webpackChunk_webpackages_source||[]).push([[948],{"./libs/form/src/lib/fields/error-animations.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>ErrorAnimations});var angular_animations__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/angular-animations@0.11.0_@angular+animations@17.0.4/node_modules/angular-animations/fesm2015/angular-animations.js");const ErrorAnimations=[(0,angular_animations__WEBPACK_IMPORTED_MODULE_0__.wg)({anchor:"enter"}),(0,angular_animations__WEBPACK_IMPORTED_MODULE_0__.mX)({anchor:"leave"})]},"./libs/form/src/lib/fields/field.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{rl:()=>BaseFieldComponent,wO:()=>CommonFieldModule});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/tslib@2.6.2/node_modules/tslib/tslib.es6.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@angular+common@17.0.4_@angular+core@17.0.4_rxjs@7.8.1/node_modules/@angular/common/fesm2022/common.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@angular+core@17.0.4_rxjs@7.8.1_zone.js@0.14.2/node_modules/@angular/core/fesm2022/core.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@angular+forms@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/forms/fesm2022/forms.mjs"),_angular_material_button__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/button.mjs"),_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/form-field.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/icon.mjs"),_angular_material_input__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/input.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/startWith.js"),rxjs__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js"),rxjs__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js");let CommonFieldModule=class CommonFieldModule{};CommonFieldModule=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({exports:[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,_angular_forms__WEBPACK_IMPORTED_MODULE_3__.u5,_angular_forms__WEBPACK_IMPORTED_MODULE_3__.UX,_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.lN,_angular_material_input__WEBPACK_IMPORTED_MODULE_5__.c,_angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.Ps,_angular_material_button__WEBPACK_IMPORTED_MODULE_7__.ot]})],CommonFieldModule);class ErrorState{isErrorState(control){return!(!control?.dirty||!control.invalid)}}let BaseFieldComponent=class BaseFieldComponent{constructor(formGroup){this.formGroup=formGroup,this.errorState=new ErrorState,this.updateEvent=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter,this.inputType="text",this.required=!1,this.prefixIcon="info",this.isUpdateField=!1}ngOnInit(){const control=this.formGroup.get(this.inputName);control?(this.errors$=control.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.O)(""),(0,rxjs__WEBPACK_IMPORTED_MODULE_9__.b)(400),(0,rxjs__WEBPACK_IMPORTED_MODULE_10__.U)((()=>control.touched&&control.dirty?Object.values(control.errors||{}).shift():null))),this.iconColor$=this.errors$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.U)((e=>control.touched&&e?"warn":"primary")))):console.error(`Controller ${this.inputName} not found!`)}focus(){this.inputRef?.focus&&this.inputRef.focus()}updateField(){const control=this.formGroup.get(this.inputName);control?.markAllAsTouched(),control?.markAsDirty(),this.updateEvent.emit(control?.value)}static#_=this.ctorParameters=()=>[{type:_angular_forms__WEBPACK_IMPORTED_MODULE_3__.cw}];static#_2=this.propDecorators={updateEvent:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Output}],inputRef:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,args:["input"]}],inputName:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],inputType:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],required:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],label:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],prefixIcon:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],suffixIcon:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],hint:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],isUpdateField:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}]}};BaseFieldComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({template:""}),(0,tslib__WEBPACK_IMPORTED_MODULE_0__.w6)("design:paramtypes",[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.cw])],BaseFieldComponent)},"./libs/form/src/lib/fields/password.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{b:()=>PasswordFieldComponent});var tslib__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/tslib@2.6.2/node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@angular+core@17.0.4_rxjs@7.8.1_zone.js@0.14.2/node_modules/@angular/core/fesm2022/core.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@angular+forms@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/forms/fesm2022/forms.mjs"),_field__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/form/src/lib/fields/field.ts"),_error_animations__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/form/src/lib/fields/error-animations.ts");let PasswordFieldComponent=class PasswordFieldComponent extends _field__WEBPACK_IMPORTED_MODULE_0__.rl{constructor(formGroup){super(formGroup),this.visible=!1,this.inputType="password"}toggleVisible(){this.visible=!this.visible,this.visible?this.inputType="text":this.inputType="password"}static#_=this.ctorParameters=()=>[{type:_angular_forms__WEBPACK_IMPORTED_MODULE_1__.cw,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_2__.Inject,args:[_angular_forms__WEBPACK_IMPORTED_MODULE_1__.cw]}]}]};PasswordFieldComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_3__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({selector:"wt-password-field",standalone:!0,imports:[_field__WEBPACK_IMPORTED_MODULE_0__.wO],template:'\n    <mat-form-field\n      style="width: 100%;"\n      appearance="outline"\n      [formGroup]="formGroup"\n    >\n      <mat-label>{{ label }}</mat-label>\n      <input\n        #input\n        [type]="inputType"\n        matInput\n        [formControlName]="inputName"\n        [attr.aria-required]="required"\n        [attr.data-testid]="inputName"\n        autocomplete="off"\n        [errorStateMatcher]="errorState"\n      />\n      <mat-icon [color]="iconColor$ | async" class="fill" matIconPrefix>\n        password\n      </mat-icon>\n\n      <mat-error [@enter] [@leave]>{{ errors$ | async }}</mat-error>\n\n      <button\n        matTextSuffix\n        mat-raised-button\n        color="primary"\n        (click)="updateField()"\n        *ngIf="isUpdateField"\n      >\n        <mat-icon matIconPrefix>update</mat-icon>\n        <span> Update </span>\n      </button>\n\n      <button\n        mat-icon-button\n        matSuffix\n        color="primary"\n        (click)="toggleVisible()"\n      >\n        <mat-icon>{{ visible ? \'visibility_off\' : \'visibility\' }}</mat-icon>\n      </button>\n    </mat-form-field>\n  ',animations:[..._error_animations__WEBPACK_IMPORTED_MODULE_4__.A]}),(0,tslib__WEBPACK_IMPORTED_MODULE_3__.w6)("design:paramtypes",[_angular_forms__WEBPACK_IMPORTED_MODULE_1__.cw])],PasswordFieldComponent)},"./libs/form/src/lib/fields/password.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Heading:()=>Heading,Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var C_Users_aemre_Projects_webtelescope_tech_node_modules_pnpm_babel_runtime_7_23_2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@storybook+angular@7.5.3_@angular-devkit+architect@0.1700.3_@angular-devkit+build-angular@17._u5b7dw7mqoq4ihk2axqguryska/node_modules/@storybook/angular/dist/index.mjs"),_password__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/form/src/lib/fields/password.ts"),_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@storybook+testing-library@0.2.2/node_modules/@storybook/testing-library/dist/index.mjs"),_storybook_jest__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@storybook+jest@0.2.3_jest@29.7.0_vitest@0.34.6/node_modules/@storybook/jest/dist/index.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@angular+platform-browser@17.0.4_@angular+animations@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4/node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@angular+forms@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/forms/fesm2022/forms.mjs");const __WEBPACK_DEFAULT_EXPORT__={component:_password__WEBPACK_IMPORTED_MODULE_2__.b,title:"PasswordFieldComponent",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.BrowserAnimationsModule],providers:[{provide:_angular_forms__WEBPACK_IMPORTED_MODULE_4__.cw,useValue:new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.cw({password:new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NI("",[])})}]})]},Primary={args:{inputName:"password",label:"Password",prefixIcon:"password",suffixIcon:"",hint:"Password Hint",required:!1,isUpdateField:!1}},Heading={args:Primary.args,play:(_ref=(0,C_Users_aemre_Projects_webtelescope_tech_node_modules_pnpm_babel_runtime_7_23_2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__.Z)((function*({canvasElement}){const canvas=(0,_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.uh)(canvasElement),password=canvas.getByLabelText(/Password/gi),showPassword=canvas.getByText(/visibility/gi),hidePassword=canvas.getByText(/visibility/gi);(0,_storybook_jest__WEBPACK_IMPORTED_MODULE_6__.l)(password).toBeTruthy(),_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.mV.clear(password),yield _storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.mV.type(password,"!Password123.",{delay:50}),yield _storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.mV.click(showPassword,{delay:400}),yield _storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.mV.click(hidePassword,{delay:2e3})})),function play(_x){return _ref.apply(this,arguments)})};var _ref},"?5370":()=>{}}]);