// import { Model } from '../__meta';
// import { IPrint } from '../__printer';
// import { ClassType, IPrinterPickerFactory } from '../common';
// import { PropertyPrinterType } from '../property';
// export class ModelPrinter implements IPrint {
//   constructor(
//     protected readonly classType: ClassType,
//     protected readonly model: Model,
//     protected readonly propertyPrinterFactory: IPrinterPickerFactory<PropertyPrinterType>,
//     protected readonly classPrinterFactory: IPrinterPickerFactory<ClsasPrinterOptions>
//   ) // Add class , document, decorator printer factories.

//   {}

//   protected __class(): string {
//     return;
//   }

//   protected __properties(): string {
//     const { modelName, properties, relations } = this.model;

//     if (properties) {
//       const printedProperties = Object.entries(properties).map(
//         ([key, value]) => {
//           const Printer = this.propertyPrinterFactory.PickPrinter(
//             this.classType
//           );
//           return new Printer({
//             name: key,
//             type: value.type!,
//             required: value.required!,
//             modelName,
//           }).print();
//         }
//       );
//     }
//   }

//   __relations() {
//     const { modelName, relations } = this.model;

//     if (relations) {
//       return Object.entries(relations).map(([key, value]) => {
//         const Printer = this.propertyPrinterFactory.PickPrinter(this.classType);
//         return new Printer({
//           name: key,
//           type: value.type!,
//           required: value.required!,
//           modelName,
//         }).print();
//       });
//     }
//     return '';
//   }

//   print(): string {}
// }
