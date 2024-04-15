(self.webpackChunk_webpackages_source=self.webpackChunk_webpackages_source||[]).push([[791],{"./libs/navigation/src/lib/navigation/nav-list/nav-list.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{U:()=>NavListComponent});var tslib_es6=__webpack_require__("./node_modules/.pnpm/tslib@2.6.2/node_modules/tslib/tslib.es6.mjs");var nav_list_componentngResource=__webpack_require__("./libs/navigation/src/lib/navigation/nav-list/nav-list.component.scss?ngResource"),nav_list_componentngResource_default=__webpack_require__.n(nav_list_componentngResource),core=__webpack_require__("./node_modules/.pnpm/@angular+core@17.0.4_rxjs@7.8.1_zone.js@0.14.2/node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/.pnpm/@angular+common@17.0.4_@angular+core@17.0.4_rxjs@7.8.1/node_modules/@angular/common/fesm2022/common.mjs"),list=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/list.mjs"),icon=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/icon.mjs"),fesm2022_button=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/button.mjs"),badge=__webpack_require__("./node_modules/.pnpm/@angular+material@17.0.1_@angular+animations@17.0.4_@angular+cdk@17.0.1_@angular+common@17.0._hy563qbtslkxwdplpakghctooa/node_modules/@angular/material/fesm2022/badge.mjs"),router=__webpack_require__("./node_modules/.pnpm/@angular+router@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/router/fesm2022/router.mjs");const modules=[common.CommonModule,list.ie,icon.Ps,fesm2022_button.ot,badge.g,router.Bz];let NavListComponent=class NavListComponent{constructor(){this.activeItem="",this.clickEvent=new core.EventEmitter}handleClickEvent(item){this.activeItem=item.label,this.clickEvent.emit(item)}static#_=this.propDecorators={title:[{type:core.Input}],listItems:[{type:core.Input}],clickEvent:[{type:core.Output}]}};NavListComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"wt-nav-list",standalone:!0,imports:[...modules],template:'<mat-nav-list>\n  <div mat-subheader>\n    <h3>{{ title }}</h3>\n  </div>\n  @for( item of listItems; track item){\n  <mat-list-item\n    class="mat-nav-list-item"\n    (click)="handleClickEvent(item)"\n    [class.active]="activeItem === item.label"\n    [routerLink]="[item.route ?? item.label]"\n    routerLinkActive="active"\n  >\n    <div matListItemLine>{{ item.label | titlecase }}</div>\n    <span matListItemIcon>\n      <mat-icon\n        class="fill"\n        [color]="item.iconColor"\n        [matBadge]="item.badge"\n        [matBadgeColor]="item.badgeColor"\n      >\n        {{ item.icon }}\n      </mat-icon>\n    </span>\n  </mat-list-item>\n  }\n</mat-nav-list>\n',styles:[nav_list_componentngResource_default()]})],NavListComponent)},"./libs/navigation/src/lib/navigation/nav-list/nav-list.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Heading:()=>Heading,Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var C_Users_aemre_Projects_webtelescope_tech_node_modules_pnpm_babel_runtime_7_23_2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@storybook+angular@7.5.3_@angular-devkit+architect@0.1700.3_@angular-devkit+build-angular@17._u5b7dw7mqoq4ihk2axqguryska/node_modules/@storybook/angular/dist/index.mjs"),_nav_list_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/navigation/src/lib/navigation/nav-list/nav-list.component.ts"),_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@storybook+testing-library@0.2.2/node_modules/@storybook/testing-library/dist/index.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@angular+core@17.0.4_rxjs@7.8.1_zone.js@0.14.2/node_modules/@angular/core/fesm2022/core.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@angular+platform-browser@17.0.4_@angular+animations@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4/node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_router__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@angular+router@17.0.4_@angular+common@17.0.4_@angular+core@17.0.4_@angular+platform-browser@17.0.4_rxjs@7.8.1/node_modules/@angular/router/fesm2022/router.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"NavListComponent",component:_nav_list_component__WEBPACK_IMPORTED_MODULE_2__.U,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_router__WEBPACK_IMPORTED_MODULE_3__.bU)([]),(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__.BrowserAnimationsModule)]})]},Primary={args:{title:"Nav List Title",listItems:[{label:"Home",icon:"home",iconColor:"primary",badge:"1",badgeColor:"accent"},{label:"About",icon:"info",iconColor:"primary",badge:"1",badgeColor:"accent"},{label:"Services",icon:"apps",iconColor:"primary",badge:"1",badgeColor:"accent"}]}},Heading={args:Primary.args,play:(_ref=(0,C_Users_aemre_Projects_webtelescope_tech_node_modules_pnpm_babel_runtime_7_23_2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__.Z)((function*({canvasElement}){(0,_storybook_testing_library__WEBPACK_IMPORTED_MODULE_1__.uh)(canvasElement)})),function play(_x){return _ref.apply(this,arguments)})};var _ref},"./libs/navigation/src/lib/navigation/nav-list/nav-list.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/.pnpm/css-loader@6.8.1_webpack@5.89.0/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/.pnpm/css-loader@6.8.1_webpack@5.89.0/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".mat-nav-list-item {\n  border-left: 3px solid white;\n  transition: border-left ease-in-out 400ms;\n}\n\n.mat-nav-list-item.active {\n  border-left: 3px solid var(--mdc-filled-text-field-caret-color);\n}\n\n.mat-nav-list-item:hover {\n  border-left: 3px solid var(--mdc-filled-text-field-caret-color);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"?5370":()=>{}}]);