import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import SwipeDeck from '../components/SwipeDeck';
import { jobsFetch } from '../actions';

class DeckScreen extends React.Component {
    renderCard(job) {
        return (
           <Card title={job.jobTitle} >
                <View>
                    <Text>{job.employerName}</Text>
                    <Text>{job.postedDate}</Text>
                </View>
           </Card>             
        );
    }

    renderNoMoreCards() {
        return (
            <Card>
                <View>
                    <Text>No More Cards</Text>
                </View>
            </Card>
        );
    }

    render() {
        return (
            <View>
                <SwipeDeck 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                />
            </View>
        );
    }
}

function mapStateToProps({ jobs }) {
    return { jobs: jobs.result };
}

export default connect(mapStateToProps, { jobsFetch })(DeckScreen);
