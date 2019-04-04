import React from 'react';
import { 
    Linking, 
    Platform, 
    ScrollView, 
    Text, 
    View 
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ReviewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return { 
            title: 'Review Jobs',
            headerRight: (
                <Button 
                    title="Settings" 
                    onPress={() => navigation.navigate('settings')} 
                    type="clear"
                    titleStyle={{ color: 'rgba(0, 122, 255, 1)' }}
                />
            ),
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 10 : 0
            }
        };
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { employerName, postedDate, url } = job;
            return (
                <Card>
                    <View style={{ height: 200 }} >
                        <View style={styles.detailWrapper} >
                            <Text style={styles.italics} >{employerName}</Text>
                            <Text style={styles.italics} >{postedDate.split('T')[0]}</Text>
                        </View>
                        <Button 
                            title='Apply Now' 
                            backgroundColor='#03A9F4' 
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
};

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps, actions)(ReviewScreen);
