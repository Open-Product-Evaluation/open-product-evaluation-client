import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';

//Mutation Answer ChoiceQuestion
const choiseAnswer = (question: string, choiceID: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $choice: ID!){
            setAnswer(data: {
                questionID: $questionID
                choice: $choice
            }){
                __typename
                answer{
                    __typename
                    question
                }
            }
        }`,
        variables: {
            questionID: question,
            choice: choiceID,
        },
    });

//Mutation Answer LIKEQuestion
const likeAnswer = (question: string, likeID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $liked: Boolean!){
            setAnswer(data: {
                questionID: $questionID
                liked: $liked
            }){
                __typename
                answer{
                    __typename
                    question
                }
            }
        }`,
        variables: {
            questionID: question,
            liked: likeID,
        },
    });

export default {
    choiseAnswer,
    likeAnswer,
};
