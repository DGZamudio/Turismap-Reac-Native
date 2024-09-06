import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';
import themeContext from '../theme/themeContext';
import { useAlert } from './Alert';
import { getData } from '../services/api';

const Crud = ({ navigation }) => {
    const theme = useContext(themeContext)
    const [showCrud, setShowCrud] = useState('0')
    const [DATA, setData] = useState([]);
    const [loading,setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const { showAlert, hideAlert } = useAlert();

    //Cargar data
    useEffect(() => {
      if (showCrud === '0'){
        return
      }
      showAlert('', 'loading')
      const url = showCrud === '1'
          ? '/get_users'
          : '/get_item';

      getData(url)
      .then((data) => {
          hideAlert();
          setData(data);
          setIsLoading(false);
          showAlert('The data has been succesfully loaded', 'success');
      })
      .catch((error) => {
          hideAlert();
          console.error('Error loading data:', error);
          showAlert('There has been an error trying to load the data', 'error');
      });
    }, [showCrud]);

    const loadData = () => {
      if (showCrud === '0'){
        return
      }
      const url = showCrud === '1'
      ? '/get_users'
      : showCrud === '2' 
      ? '/get_item' : '';
      showAlert('', 'loading')
      getData(url)
      .then((data) => {
          hideAlert();
          setData(data);
          setIsLoading(false);
          showAlert('The data has been succesfully loaded', 'success');
      })
      .catch((error) => {
          hideAlert();
          console.error('Error loading data:', error);
          showAlert('There has been an error trying to load the data', 'error');
      });

    }

    //Buscar usuario
    const searchUser = () => {
      showAlert('', 'loading')
      fetch(`https://turismap-backend-python.onrender.com/search_user?q=${encodeURIComponent(search)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        hideAlert()
        setData(data);
      })
      .catch((error) => {
        hideAlert()
        console.error('Error al obtener los usuarios:', error);
      });
    }

    const searchData = () => {
      showAlert('', 'loading')
      fetch(`https://turismap-backend-python.onrender.com/search_item?q=${encodeURIComponent(search)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        hideAlert()
        setData(data);
      })
      .catch((error) => {
        hideAlert()
        console.error('Error al obtener los usuarios:', error);
      });
    }
    
    type ItemProps = {_id: string; nombreUsuario: string; correoUsuario: string; estadoUsuario: string; rolUsuario: string;};
    type ItemProps2 = {_id: string; nombreSitiosTuristicos: string; estadoSitiosTuristicos: string;}

    //Eliminar Usuario
    const deleteUser = (id) => {
      setShowDeleteAlert(true);
      setUserIdToDelete(id); 
    };

    //Editar Usuario
    const edit = (user) => {
      const userData = DATA.find(u => u._id === user._id);
      if (userData) {
          navigation.navigate('EditProfile', { data: userData });
      }
    };
  
    //Item de la tabla usuario
    const Item = ({ _id, nombreUsuario, correoUsuario, estadoUsuario, rolUsuario }: ItemProps) => (
        <View style={styles.rowList}>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{_id}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{nombreUsuario}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{correoUsuario}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{estadoUsuario}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{rolUsuario}</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.rowIcon}>
              <Pressable style={styles.editItemn} >
                <AntDesign name="edit" size={24} color="black" 
                onPress={() => edit({_id, nombreUsuario})} />
              </Pressable>
            {/*<Pressable style={styles.delItemn} 
              onPress={() => deleteUser(_id)}>
                <AntDesign name="delete" size={24} color="black"/>
              </Pressable>*/}
            </View>
          </View>
        </View>
    );

    const Item2 = ({ _id, nombreSitiosTuristicos, estadoSitiosTuristicos}: ItemProps2) => (
        <View style={styles.rowList}>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{_id}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{nombreSitiosTuristicos}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{estadoSitiosTuristicos}</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.rowIcon}>
              <Pressable style={styles.editItemn} >
                <AntDesign name="edit" size={24} color="black" 
                onPress={() => edit({_id, nombreSitiosTuristicos})} />
              </Pressable>
              <Pressable style={styles.delItemn} 
              onPress={() => deleteUser(_id)}>
                <AntDesign name="delete" size={24} color="black"/>
              </Pressable>
            </View>
          </View>
        </View>
    );

  return (
    <View style={[styles.container, {backgroundColor: theme.bg1}]}>
        <ScrollView style={[styles.card, {backgroundColor: theme.bg2}]}>
            <Text style={[styles.title, {color: theme.title, borderBottomColor: theme.title}]}>Lists</Text>
            <View style={[styles.crud, {backgroundColor: theme.bg3}]}>
              <View style={styles.buttons}>
                <Text style={[styles.title, {color: theme.title, borderBottomColor: theme.title}]}>Users</Text>
                {showCrud === '0' && (
                  <Pressable onPress={() => {setShowCrud('1')}}>
                    <AntDesign name="plus" size={24} color={theme.title} />
                  </Pressable>
                )}
                {showCrud === '1' && (
                    <Pressable onPress={() => setShowCrud('0')}>
                      <AntDesign name="minus" size={24} color={theme.title} />
                    </Pressable>

                )}
              </View>
              {showCrud === '1' && (
                <>
                <View style={styles.buttons}>
                  <Pressable onPress={() => navigation.navigate('AddUser')} style={styles.addButton}>
                    <Text style={{color:'#FFF'}}>
                      Add
                    </Text>
                    <AntDesign name="adduser" size={24} color="white" />
                  </Pressable>
                  <Pressable style={styles.refresh}>
                    <AntDesign name="reload1" size={24} color="black" onPress={() => loadData()} />
                  </Pressable>
                  <View style={styles.search}>          
                    <TextInput placeholder='Search' style={styles.searchContent} onChangeText={text => setSearch(text)}/>
                    <Pressable onPress={() => searchUser()}>
                      <AntDesign name="search1" size={24} color="grey" style={{
                        marginRight:15,
                      }} />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.headerRow}>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Id</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Name</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Email</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>State</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Role</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Options</Text>
                    </View>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item _id={item._id} nombreUsuario={item.nombreUsuario} correoUsuario={item.correoUsuario} estadoUsuario={item.estadoUsuario} rolUsuario={item.rolUsuario} />}
                    keyExtractor={item => item._id}
                    onRefresh={() => loadData()}
                    refreshing = {loading}
                />
              </>
                )}
            </View>


            <View style={[styles.crud, {backgroundColor: theme.bg3}]}>
              <View style={styles.buttons}>
                <Text style={[styles.title, {color: theme.title, borderBottomColor: theme.title}]}>Turistic places</Text>
                {showCrud === '0' && (
                  <Pressable onPress={() => {setShowCrud('2')}}>
                    <AntDesign name="plus" size={24} color={theme.title} />
                  </Pressable>
                )}
                {showCrud === '2' && (
                  <Pressable onPress={() => setShowCrud('0')}>
                    <AntDesign name="minus" size={24} color={theme.title} />
                  </Pressable>
                )}
              </View>
              {showCrud === '2' && (
                <>
                <View style={styles.buttons}>
                  <Pressable onPress={() => navigation.navigate('AddLocal')} style={styles.addButton}>
                    <Text style={{color:'#FFF'}}>
                      Add
                    </Text>
                    <AntDesign name="adduser" size={24} color="white" />
                  </Pressable>
                  <Pressable style={styles.refresh}>
                    <AntDesign name="reload1" size={24} color="black" onPress={() => loadData()} />
                  </Pressable>
                  <View style={styles.search}>          
                    <TextInput placeholder='Search' style={styles.searchContent} onChangeText={text => setSearch(text)}/>
                    <Pressable onPress={() => searchData()}>
                      <AntDesign name="search1" size={24} color="grey" style={{
                        marginRight:15,
                      }} />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.headerRow}>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Id</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Name</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>State</Text>
                    </View>
                    <View style={styles.headerItem}>
                      <Text style={[styles.listTitle, {color: theme.title, borderBottomColor: theme.title}]}>Options</Text>
                    </View>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item2 _id={item._id} nombreSitiosTuristicos={item.nombreSitiosTuristicos} estadoSitiosTuristicos={item.estadoSitiosTuristicos}/>}
                    keyExtractor={item => item._id}
                    onRefresh={() => loadData()}
                    refreshing = {loading}
                />
              </>
                )}
            </View>
            <AwesomeAlert
              show={showDeleteAlert}
              showProgress={false}
              title="Are you sure?"
              message="Are you sure you want to delete the user"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={true}
              showConfirmButton={true}
              confirmText="I am sure"
              confirmButtonColor="#e23636"
              onCancelPressed={() => setShowDeleteAlert(false)}
              onConfirmPressed={() => {
                setShowDeleteAlert(false);
                showAlert('', 'loading');
                {showCrud === '1' && (
                  fetch(`https://turismap-backend-python.onrender.com/delete_user/${userIdToDelete}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                  .then(response => {
                    if (response.ok) {
                      hideAlert();
                      setData(DATA.filter(user => user._id !== userIdToDelete)); 
                      showAlert('The user has been deleted', 'succes');
                    } else {
                      hideAlert();
                      console.error('Error deleting user:', response.statusText);
                      showAlert('There seems to be an error trying to delete the user', 'error');
                    }
                  })
                  .catch(error => {
                    hideAlert();
                    console.error('Error deleting user:', error);
                    showAlert('There seems to be an error trying to delete the user', 'error');
                  })
                )}

                {showCrud === '2' && (
                  fetch(`https://turismap-backend-python.onrender.com/delete_item/${userIdToDelete}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                  .then(response => {
                    if (response.ok) {
                      hideAlert();
                      setData(DATA.filter(user => user._id !== userIdToDelete)); 
                      showAlert('The local has been deleted', 'success');
                    } else {
                      hideAlert();
                      console.error('Error deleting local:', response.statusText);
                      showAlert('There seems to be an error trying to delete the local', 'error');
                    }
                  })
                  .catch(error => {
                    hideAlert();
                    console.error('Error deleting local:', error);
                    showAlert('There seems to be an error trying to delete the local', 'error');
                  })
                )}
              }}
            />
        </ScrollView>
    </View>
  )
}

export default Crud

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    card: {
        margin: '15%',
        width: '90%',
        borderRadius: 30,
        shadowColor: '#191919',
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 10,
        shadowRadius: 60,
        elevation: 15,
      },
      buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:'5%',
        marginRight:'5%',
        marginTop:'5%',
      },
      crud: {
        margin: '5%',
        width: '90%',
        borderRadius: 30,
        shadowColor: '#191919',
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 10,
        shadowRadius: 60,
        elevation: 15,
      },
      search1: {
        alignItems: "center",
        marginTop: "5%"
      },
      addButton: {
        padding:'2%',
        width:65,
        borderRadius:5,
        backgroundColor:'#00bb00',
        flexDirection:'row',
      },
      refresh: {
        padding:'2%',
        borderRadius:5,
        backgroundColor:'#2888A8',
        flexDirection:'row',
        justifyContent:'center',
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
        width:'55%',
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
        fontSize: 25,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        textAlign: 'center',
      },
      listTitle:{
        textAlign: 'center',
        fontSize: 12,
        borderBottomWidth: 1,
        margin: '2%',
      },
      itemTitle: {
        color: '#f8f9fa',
        fontSize: 12,
        textAlign: 'center',
      },
});
