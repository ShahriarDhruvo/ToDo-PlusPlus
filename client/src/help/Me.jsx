import React from "react";
import emoji from "react-easy-emoji";
import { Container } from "react-bootstrap";

const Me = () => {
    return (
        <Container className="vertical-center">
            <div className="ccard bg-main-bg">
                <div className="p-3 p-md-4" style={{ wordWrap: "normal" }}>
                    <h4 className="text-center mb-4">
                        Who & What made this possible?
                    </h4>

                    <div className="d-flex d-md-block justify-content-center">
                        <img
                            src="/static/img/sed.jpg"
                            alt="One & only developer"
                            className="mb-4 mr-md-4 mb-md-2 mt-md-2 float-md-left"
                            style={{ width: "18rem", borderRadius: "0.45rem" }}
                        />
                    </div>

                    <div className="text-justify">
                        <p>
                            As-salamu alaikum, I am <b>Shahriar Elahi Dhruvo</b>
                            , currently a student of Software Engineering (SWE)
                            at Shahjalal University of Science & Technology
                            (SUST). I started learning React JS & Django
                            alongside some other frameworks halfway through my
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

                        <br />
                        <p>
                            And so, I built <b>To-do++</b> using React JS,
                            Django and DRF (Django Rest Framework). I started
                            using it on a regular basis and was tweaking it to
                            satisfy my own need. Firstly, this was made to serve
                            purely my needs only. But later sometimes, seeing
                            this can be useful to other users also, I decided to
                            make it public. Soon, I realized the website had
                            some limitation and I also didn't like the design.
                            So, I decided to redesign it and implement some
                            feature that some user may need. And now, you can
                            see the most refined and full version of the todo
                            list idea that I had to track down my other ideas.
                        </p>

                        <p>
                            This project is built out of my personal interest. I
                            built this one by keeping in mind that I will use
                            it. I know there are a lot of “To-do list” projects
                            done by some big companies like Google's "Google
                            Keep" & a bunch of other note taking app.{" "}
                            <b>
                                But this is not quite a note taking website.
                                This is made to break your big work into small
                                pieces and sort them step by step with/without a
                                deadline, so that you don’t lose track of what
                                to do and when to do when you’re exhausted.
                            </b>{" "}
                            And this kind of website makes more sense for a
                            mobile app but sadly, now I am not quite interested
                            in mobile app development.
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
                            made the making process of <b>To-do++</b> a bit
                            smooth for me. My friends, Farhan Dipto, Shakirul
                            Hasan Khan, R.M. Muksid Uddin, university seniors:
                            Rafiul Islam, Dipto Mondal, Ali Ahmmed Tonoy and of
                            course my family members, these guys helped me
                            whenever I needed some feedbacks and when I was at
                            lost for materials. Without them it would've taken
                            me much longer to complete my website.
                        </p>

                        <span>
                            So, if you like what I did then like, share and give
                            star to my{" "}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/ShahriarDhruvo"
                            >
                                Github
                            </a>{" "}
                            repo {emoji("😁")}. And I hope my project helps you
                            a bit to maintain your works. Thank you!
                        </span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Me;
