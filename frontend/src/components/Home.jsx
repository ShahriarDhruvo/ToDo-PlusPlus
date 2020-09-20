import React from "react";
import Tasks from "./Tasks";
import Header from "../generic/Header";
import { Container } from "react-bootstrap";
import AddTask from "./AddTask";

const Home = () => {
    // Dummy data
    const tasks = [];

    for (let i = 0; i < 15; i++) {
        if (Math.random() >= 0.5) {
            tasks.push({
                title: "1.Have to add some spice",
                completed: Math.random() >= 0.5,
            });
        } else {
            tasks.push({
                title:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quam, fugit minus soluta eveniet libero. Fuga obcaecati asperiores quasi nostrum distinctio, laboriosam ratione nesciunt dicta? Placeat vitae officiis ipsam debitis.",
                completed: Math.random() >= 0.5,
            });
        }
    }
    // Dummy data

    return (
        <Container>
            <Header />
            <AddTask />
            <Tasks
                tasks={tasks}
                // strikeUnstrike={}
                // startEdit={}
                // deleteItem={}
            />
        </Container>
    );
};

export default Home;
