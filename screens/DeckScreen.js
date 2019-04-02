import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import SwipeDeck from '../components/SwipeDeck';
import { fetchJobs } from '../actions';

class DeckScreen extends React.Component {
    renderCard(job) {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        };

        return (
           <Card title={job.jobTitle} >
                <View style={{ height: 300 }} >
                    <MapView 
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        initialRegion={initialRegion}
                    />
                </View>
                <View style={styles.detailWrapper} >
                    <Text>{job.employerName}</Text>
                    <Text>{job.postedDate.split('T')[0]}</Text>
                </View>
                <Text>{job.jobDescription.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
           </Card>             
        );
    }

    renderNoMoreCards() {
        return (
            <Card>
                <View title='No More Cards' />
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

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10    
    }
};

function mapStateToProps({ jobs }) {
    return { jobs: jobs.filteredJobs };
}

export default connect(mapStateToProps, { fetchJobs })(DeckScreen);
