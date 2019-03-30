import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { jobsFetch } from '../actions';

class DeckScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
            </View>
        );
    }
}

function mapStateToProps({ jobs }) {
    return { jobs: jobs.result };
}

export default connect(mapStateToProps, { jobsFetch })(DeckScreen);
