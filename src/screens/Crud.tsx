import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const Crud = () => {
    const DATA = [
        {
          id: '1',
          title: 'Pablo',
          email: 'Pablitoxx@gmail.com'
        },
        {
          id: '2',
          title: 'Marian',
          email: 'laragozza@gmail.com'
        },
        {
          id: '3',
          title: 'Danna',
          email: 'idk782@gmail.com'
        },
      ];
      
    type ItemProps = {id: string; title: string; email: string};
      
    const Item = ({ id, title, email }: ItemProps) => (
        <View style={styles.rowList}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{id}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{title}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{email}</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.rowIcon}>
              <Pressable style={styles.editItemn} >
                <AntDesign name="edit" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.delItemn} >
                <AntDesign name="delete" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
    );

  return (
    <View style={styles.container}>
        <ScrollView style={styles.card}>
            <Text style={styles.title}>Lists</Text>
            <View style={styles.buttons}>
              <Pressable style={styles.addButton}>
                <Text style={{color:'#FFF'}}>
                  Add
                </Text>
                <AntDesign name="adduser" size={24} color="white" />
              </Pressable>
              <View style={styles.search}>          
                <TextInput placeholder='Search' style={styles.searchContent} />
                <AntDesign name="search1" size={24} color="grey" style={{
                  marginRight:15,
                }} />
              </View>
            </View>
            <View style={styles.crud}>
              <Text style={styles.title}>Users</Text>
              <View style={{
                        margin:'5%',
                        marginLeft:'18%',
                        flexDirection:'row',
                        backgroundColor:'#D4D4D4',
                        borderRadius:30,
                        justifyContent:'space-around',
                        borderWidth:3,
                        borderColor:'#000',
                        width:'65%',
                        height:35
              }}>          
                <TextInput placeholder='Search' style={styles.searchContent} />
                <AntDesign name="search1" size={24} color="grey" style={{
                  marginRight:15,
                }} />
              </View>
              <View style={styles.headerRow}>
                  <View style={styles.headerItem}>
                    <Text style={styles.listTitle}>Id</Text>
                  </View>
                  <View style={styles.headerItem}>
                    <Text style={styles.listTitle}>Name</Text>
                  </View>
                  <View style={styles.headerItem}>
                    <Text style={styles.listTitle}>Email</Text>
                  </View>
                  <View style={styles.headerItem}>
                    <Text style={styles.listTitle}>Options</Text>
                  </View>
              </View>
              <FlatList
                  data={DATA}
                  renderItem={({ item }) => <Item id={item.id} title={item.title} email={item.email} />}
                  keyExtractor={item => item.id}
              />
            </View>

            
            
        </ScrollView>
    </View>
  )
}

export default Crud

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#050505',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    card: {
        margin: '15%',
        width: '90%',
        borderRadius: 30,
        backgroundColor: '#212121',
        shadowColor: '#191919',
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 10,
        shadowRadius: 60,
        elevation: 15,
      },
      buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:'8%',
        marginRight:'8%',
        marginTop:'5%',
      },
      crud: {
        margin: '5%',
        width: '90%',
        borderRadius: 30,
        backgroundColor: '#303030',
        shadowColor: '#191919',
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 10,
        shadowRadius: 60,
        elevation: 15,
      },
      addButton: {
        padding:'2%',
        width:65,
        borderRadius:5,
        backgroundColor:'#00bb00',
        flexDirection:'row',
      },
      headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      rowList:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      rowIcon:{
        justifyContent:'center',
        flexDirection: 'row', 
      },
      search: {
        flexDirection:'row',
        backgroundColor:'#D4D4D4',
        borderRadius:30,
        color: '#646464',
        justifyContent:'space-around',
        borderWidth:3,
        borderColor:'#000',
        width:'65%',
        height:35
      },
      searchContent: {
        textAlign:'center',
        alignItems:'center',
        width:'70%',
        height:30,
      },
      delItemn:{
        width:26,
        height:26,
        marginLeft:5,
        backgroundColor:'#e23636',
        borderRadius:10,
      },
      editItemn:{
        width:26,
        height:26,
        borderRadius:10,
        backgroundColor:'#edb95e',
      },
      headerItem: {
        flex: 1,
        paddingVertical: 10,
      },
      item: {
        flex: 1,
      },
      title:{
        color:'#FFF',
        fontSize: 25,
        fontWeight: 'bold',
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        textAlign: 'center',
      },
      listTitle:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        margin: '2%',
      },
      itemTitle: {
        color: '#f8f9fa',
        fontSize: 12,
        textAlign: 'center',
      },
});
