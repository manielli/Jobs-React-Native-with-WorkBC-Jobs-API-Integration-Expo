import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import SwipeDeck from '../components/SwipeDeck';
import { 
    fetchJobs, 
    likeJob, 
    dislikeJob 
} from '../actions';

class DeckScreen extends React.Component {
    renderCard(job) {
        const initialRegion = {
            longitude: job.location.lng,
            latitude: job.location.lat,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };

        return (
           <Card title={job.jobTitle} titleStyle={{ height: 50 }} >
                <View style={{ height: 300 }} >
                    <MapView 
                        scrollEnabled={false}
                        style={{ flex: 1, marginBottom: 25 }}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        // cacheEnabled
                        initialRegion={initialRegion}
                    />
                </View>
                <View style={styles.detailWrapper} >
                    <Text>{job.employerName}</Text>
                    <Text>{job.postedDate.split('T')[0]}</Text>
                </View>
                <Text style={{ height: 100 }} >{job.jobDescription.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
           </Card>             
        );
    }

    renderNoMoreCards() {
        return (
            <Card title='No More Cards' >
                <Button 
                    title='Back To Map'
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor='#03A9F4'
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ top: 50 }} >
                <SwipeDeck 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp='jobID'
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
    return { jobs: jobs.filteredJobsWithGeoLocation };
}

export default connect(mapStateToProps, { 
    fetchJobs, 
    likeJob, 
    dislikeJob 
})(DeckScreen);
