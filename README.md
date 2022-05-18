# Turtles API

---

[Heroku App Link](https://bb-sei-turtle-api.herokuapp.com/)

---

| NAME   | ENDPOINT     | VERB   | METHOD                     |
| ------ | ------------ | ------ | -------------------------- |
| INDEX  | /turtles     | GET    | Turtle.find()              |
| DELETE | /turtles/:id | DELETE | Turtle.findByIdAndDelete() |
| UPDATE | /turtles/:id | PUT    | Turtle.findByIdAndUpdate() |
| CREATE | /turtles     | POST   | Turtle.create()            |
| SHOW   | /turtles/:id | GET    | Turtle.findById()          |
