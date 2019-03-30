import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SwipeDeck from '../components/SwipeDeck';
import { jobsFetch } from '../actions';

class DeckScreen extends React.Component {
    render() {
        return (
            <View>
                <SwipeDeck 
                    data={this.props.jobs}
                />
            </View>
        );
    }
}

function mapStateToProps({ jobs }) {
    return { jobs: jobs.result };
}

export default connect(mapStateToProps, { jobsFetch })(DeckScreen);
