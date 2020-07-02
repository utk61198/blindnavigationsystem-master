
import React,{ Component } from 'react';
import {View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,Text
} from 'react-native';
import  Geolocation  from 'react-native-geolocation-service';


//Implement geolocation to get latitude and longitude
export default class Location extends Component{

  constructor(props){
    super(props);

    this.state = {
      forceLocation: true,
      highAccuracy: true,
      loading: false,
      showLocationDialog: true,
      significantChanges: false,
      updatesEnabled: false,
      location: {},
    };

    //this.getLocation();

  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.setState({ location: position, loading: false });

        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          this.setState({ location: position });
          console.log(position);

        },
        (error) => {
          this.setState({ location: error });
          console.log(error);
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          distanceFilter: 50,
          interval: 5000,
          fastestInterval: 2000,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
          useSignificantChanges: this.state.significantChanges,
        },
      );
    });
  };

  removeLocationUpdates = () => {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.setState({ updatesEnabled: false });
    }
  };

  setAccuracy = (value) => this.setState({ highAccuracy: value });
  setSignificantChange = (value) =>
    this.setState({ significantChanges: value });
  setLocationDialog = (value) => this.setState({ showLocationDialog: value });
  setForceLocation = (value) => this.setState({ forceLocation: value });

  async componentDidMount(){
    console.log("abhid");
    await this.getLocation();
  }




  


  render(){

    return( <View>
     <Text>{JSON.stringify(this.state.location)}</Text> 
    </View>
  );

   
}

}