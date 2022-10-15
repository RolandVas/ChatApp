export interface Channel {
    name: string;
    description?: string;
    id?: string; 
    // toJSON()
}

// export class channelClass implements Channel {
//     name: string;
//     description: string;
//     id: string;

//     constructor(channelJSON?: any){
//         this.name = channelJSON ? channelJSON.name : '';
//         this.description = channelJSON ? channelJSON.description : '';
//         this.id = channelJSON ? channelJSON.id : '';
//       }

//     toJSON() {
//         return {
//             name: this.name,
//             description: this.description,
//             id: this.id
//         }
        
//     }
// }