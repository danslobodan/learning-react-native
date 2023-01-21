import React, { useContext, useCallback } from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from 'react-native-elements'
import { withNavigationFocus } from "react-navigation";
import { FontAwesome } from '@expo/vector-icons';

import { Context as LocationContext } from '../context/LocationContext';

import Map from '../components/Map';
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

// import '../_mockLocation';

const TrackCreateScreen = ({ isFocused }) => {

    const { state: { recording }, addLocation } = useContext(LocationContext);

    const callback = useCallback(
        (location) => addLocation(location, recording),
        [recording]);

    const [err] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={20} />
}

const styles = StyleSheet.create({

})

export default withNavigationFocus(TrackCreateScreen);