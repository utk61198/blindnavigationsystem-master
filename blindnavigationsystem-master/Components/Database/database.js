import React, { Component } from 'react';
import { View,Text,
StyleSheet,Button} from 'react-native';
import { TouchableOpacity, RawButton } from 'react-native-gesture-handler';


import PouchDB from 'pouchdb-react-native'

import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

export default class GetButton extends Component{

constructor(props)
{super(props)
   this.state={
        positions:[],
    }
this.getdata=this.getdata.bind(this)











}

getdata=()=>
{
  const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
  PouchDB.plugin(SQLiteAdapter)
  
const rdbaddress=`http://admin:admin@192.168.1.9:5984/position`
const dbadress='mydb.db'

const rdb=new PouchDB(rdbaddress);
const db=new PouchDB(dbadress,{adpater:'react-native-sqlite'});


// rdb.put({
//     _id:'G1',
//     latitude:40.714,
//     longitude:74.006

//   }).then(function (response) {
//     alert("worked")
//   }).catch(function (err) {
//     alert("error")
//     console.log(err);
//   });
let position_array=[]
let temp="";
rdb.allDocs({include_docs: true}, (err, docs)=> {
    if (err) {
       return console.log(err);
    } else {
       for(let i=0;i<docs.total_rows;i++)
       {
         position_array.push({position:docs.rows[i].doc._id,latitude:docs.rows[i].doc.latitude,longitude:docs.rows[i].doc.longitude})
         db.put({
          _id:docs.rows[i].doc._id,
          latitude:docs.rows[i].doc.latitude,
          longitude:docs.rows[i].doc.longitude
      
        }).then(function (response) {

        }).catch(function (err) {
          console.log(err);
        });
        }
// alert( position_array.length)
       this.setState({
       positions:position_array,

      })

     // alert(this.state.positions[0].position)

      
    }
 });






}

seedata=()=>{


alert(this.state.positions[0].position+" "+this.state.positions[0].latitude+" "+this.state.positions[0].longitude)


}




    render()
    {
       return(
<View>
<View style={styles.container}>

<Button title="Fetch data" onPress={()=>this.getdata()} style={styles.getbutton} >
 

</Button>


</View>

<View style={styles.container}>

<Button title="View data" onPress={()=>this.seedata()} style={styles.getbutton} >
 

</Button>


</View>
</View>
        
       )
    }
}



const styles=StyleSheet.create(
    {



        container:{
          alignItems:'center',
          justifyContent:'center',
          marginVertical:100,

       



        },
        getbutton:{
          flex:1,

          borderWidth:1,
           height:50,
           width:200,
          backgroundColor:'cyan',
          alignItems:'center',
          justifyContent:'center',
          paddingTop:20,
          

       
         

        },
        
        
   
        txt:{
fontSize:25,

       
         

        }





    }
)