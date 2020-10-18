import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
    return (
        <Container className="vertical-center">
            <div className="col ccard bg-main-bg p-0 text-center">
                <div className="p-3 p-md-4">
                    <h5>What is this about?</h5>
                    <div>
                        This is not your typical note taking website. Although
                        you can use it for making lists. This one is intended to
                        be used in those situation where you need to create a
                        list of tasks to complete a certain work. Mainly in
                        those where you need to finish it within a certain
                        amount of time.
                    </div>
                    <div>
                        Example:
                        <p>
                            1. You have buy some grocery. You make a list (add
                            some task) of that under a certain work name
                            "Today's lunch". Then you add some tasks under that
                            work name like a. Have to buy some potatoes b. Need
                            to buys some handwash... etc. After going to the
                            supermarket you mark the task no. a, as complete and
                            so on... Someone can also update/add into your task
                            field if you add them as a collaborator. He/she can
                            add, remove or update what you have to buy and what
                            you do not have to buy.
                        </p>
                        <p>
                            2. Say, you are in a project with some of your
                            colleagues. You are the lead developer. You create a
                            work under some random name say, "Project 350". Then
                            you added your colleagues as collaborators. They can
                            add, remove or update the tasks under that work.
                            Say, "Mr. 0" is working on the header section of a
                            website. Then he can add a task title called
                            "working on the header section" and set the timer as
                            2 days. Then others will know that he is working on
                            this section and will finish within this time limit,
                            so we can work on other things. So "Mr. 1" add a
                            task name "working on body section" and added a
                            timer and so on.... In this way you and your
                            colleagues can work in sync with each other.
                        </p>
                        <p>
                            3. Or you have some great ideas about some future
                            work. You can add a work title called "My future
                            ideas". Under that work this can be some tasks you
                            can add: a. Will make my portfolio within this
                            month. b. Want to make a music news feed type
                            website. etc
                        </p>
                        <p>
                            Again, ideas are endless. This website is just a
                            tool to help you with managing all of your ideas.
                        </p>
                    </div>
                    <div>
                        Licensing and Freedomness of this project
                        <p>
                            This project an open source project, licenced under
                            MIT license.
                        </p>
                    </div>
                    <div>
                        FAQ
                        <p>Q: Why can't I add/remove collaborator?</p>
                        <p>
                            A: Only he/she who created that work (owner of that
                            work) can do so.
                        </p>
                        <p>Q: My added work/task is not showing..</p>
                        <p>
                            A: Try refreshing the page. If that doesn't work try
                            logout then login again.
                        </p>
                        <p>
                            Q: Why clicking on a link from a work title or task
                            title doesn't work?
                        </p>
                        <p>
                            A: Well, It is not intended to share links. You can
                            always copy-paste it.
                        </p>
                        <p>
                            Work title is limited to 100 characters and task
                            title is limited to 400 characters. You cannot add
                            more than this but you can create a lot of works and
                            tasks.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default About;
