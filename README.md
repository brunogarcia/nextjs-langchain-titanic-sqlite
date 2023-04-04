# App using LangChain, Titanic SQLite Database and the API of OpenAI

## Description

The main goal of both projects is to research about the LangChain library and the API of OpenAI using the Titanic SQLite database.

![How Is It Work?](how-is-it-work.png)

## How is it working?

- First, the [API of OpenAI](https://openai.com/blog/openai-api) allows me to use the [GPT-3](https://openai.com/blog/gpt-3-apps/) model at a very cheap price.
  The total cost of the research was $0.36.
- Then, the [LangChain](https://python.langchain.com/) library allows me to connect the OpenAI API and the Titanic Database in a very simple way.
- Finally, [Next.js](https://nextjs.org/) let me create a simple web application that allows the final user to interact with the database in a natural language.

## Database

The table is called `titanic` and has the following columns.

🥳 Amazing: even the this table was created using natural language:

> "Give the column name, data type and description of the table titanic in markdown format"

| Column Name | Data Type | Description                           |
| ----------- | --------- | ------------------------------------- |
| PassengerId | TEXT      | Unique identifier for each passenger  |
| Survived    | TEXT      | Whether the passenger survived or not |
| Pclass      | TEXT      | Passenger class                       |
| Name        | TEXT      | Passenger name                        |
| Sex         | TEXT      | Passenger gender                      |
| Age         | TEXT      | Passenger age                         |
| SibSp       | TEXT      | Number of siblings/spouses aboard     |
| Parch       | TEXT      | Number of parents/children aboard     |
| Ticket      | TEXT      | Ticket number                         |
| Fare        | TEXT      | Ticket fare                           |
| Cabin       | TEXT      | Cabin number                          |
| Embarked    | TEXT      | Port of embarkation                   |

## Answering the questions with natural language

The app and the notebook are able to answer the following questions in natural language:

1. How many passengers survived?
2. How many passengers were in each class?
3. How many passengers survived/died within each class?
4. What was the average age of survivors vs non-survivors?
5. What was the average age of each passenger class?
6. What was the average fare by passenger class? By survival?
7. How many siblings/spouses aboard on average, by passenger class? By survival?
8. How many parents/children aboard on average, by passenger class? By survival?

### Example #1: How many passengers survived?

```html
342 passengers survived.
```

### Example #2: How many passengers were in each class?

```html
There were 216 passengers in first class, 184 passengers in second class, and 491 passengers in
third class.
```

## Run on development mode

Remember to rename the file `.env.example` to `.env.local` and fill in with your [OpenAI API key](https://platform.openai.com/account/api-keys)

```shell
npm run dev
```
