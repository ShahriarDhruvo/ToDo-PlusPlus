import React from "react";
import { Container } from "react-bootstrap";

const Me = () => {
    return (
        <Container className="vertical-center">
            <div className="col ccard bg-main-bg p-0">
                <div className="p-3 p-md-4">
                    <img
                        src="/static/img/sed.jpg"
                        alt="One & only developer"
                        className="mr-4 mb-2 float-left"
                        style={{ width: "18rem", borderRadius: "0.45rem" }}
                    />

                    <div>
                        <p>
                            As-salamu alaikum, I am Shahriar Elahi Dhruvo,
                            currently pursuing study in Software Engineering
                            (SWE) at Shahjalal University of Science &
                            Technology (SUST). I started learning React JS &
                            Django alongside some other ** halfway through my
                            study. After I attained some fluency, I was thinking
                            of some ideas for a website to practice a set of
                            skills in that department.
                        </p>

                        <p>
                            After a while, countless ideas were scattering
                            through my head, some of which had great potentials
                            but sadly enough, I was losing track of those. Every
                            time I think of something to do (got some ideas), I
                            tend to forget about implementing it in their
                            suitable projects after a certain amount of time.
                        </p>

                        <p>
                            And so, I built To-do++ using React JS & Django to
                            learn this DRF (Django Rest Framework). I started
                            using it on a regular basis and was changing it my
                            way to deliver my own need. Firstly, this was made
                            to serve purely my needs only. But later sometimes,
                            seeing this can be useful to other users also, I
                            decided to make it public. Soon, I realized the
                            website had some limitation and I also didn't like
                            the design. So, I decided to redesign it and
                            implement some feature that some user may need. And
                            now, you can see the most refined and full version
                            of the todo list idea that I had to track down my
                            other ideas.
                        </p>

                        <p>
                            So here we go. This is the project that I built out
                            of my personal need. I built this one by keeping in
                            mind that I will use it. I know there are a lot of
                            “To-do list” projects done by some big companies
                            like Google's "Google Keep" & a bunch of other note
                            taking app. But mine doesn’t stop at just note
                            taking. This was made to break your big work in
                            small pieces and sort them step by step with/without
                            so that you don’t lose track of what to do now when
                            you’re exhausted. And this kind of website makes
                            more sense for a mobile app but sadly, now I only
                            know how to develop a complete website.
                        </p>

                        <p>
                            After 3 months of procrastination, I finally
                            completed this project. This is not much but I gave
                            my best within the little time and patience that I
                            had.
                        </p>

                        <p>
                            I know this is not a big deal but it doesn't hurt to
                            write about it, is it? There are some people who
                            made the making process of To-do++ a bit smooth for
                            me. My friends, Farhan Dipto, R.M. Muksid Uddin,
                            Shakirul Hasan Khan, university seniors: Rafiul
                            Islam, Dipto Mondal, Ali Ahmmed Tonoy and of course
                            my family members, these guys helped me whenever I
                            needed feedbacks and when I was at lost for
                            materials. Without them it would've taken me much
                            longer to complete my website.
                        </p>

                        <p>
                            So, if you like what I did then like, share and give
                            star to my Github repo. And I hope my project helps
                            you a bit maintaining your works. Thank you!
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Me;
