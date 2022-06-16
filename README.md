# Tendable Coding Assessment

## Usage

```sh
yarn
yarn dev
```

## Goal

Complete this React program to ask the end user a series of Yes/No questions, calculate and report the score back to them after each run. Additionally, calculate and report overall score for all runs.

## Requirements

Given I am a user accessing the webapp\
When I run the application\
Then I should be presented with a series of questions that can only be answered as a Yes or a No\
Score should be calculated using the following equation : 100 * number of yes answers/number of questions\
And the calculated score should be printed

When I re-run the application\
then the program should also print an average rating for all runs

Notes:\
Please feel free to use a persistent storage you seem fit for example Node-Persist\
The questions can be found in src/questions.ts.\
Ensure we can run your exercise.
