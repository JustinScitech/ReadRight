ReadRight

Inspiration
We wanted to tackle a problem that impacts a large demographic of people. After research we learned that 1 in 10 people suffer from dyslexia and 5-20% of people suffer from dysgraphia. These neurological disorders go undiagnosed or misdiagnosed often leading to these individuals constantly struggling to read and write which is an integral part of your education. With such learning disabilities, learning a new language would be quite frustrating and filled with struggles. Thus, we decided to create an application like Duolingo that helps make the learning process easier and more catered towards individuals.

What it does
ReadRight offers interactive language lessons but with a unique twist. It reads out the prompt to the user as opposed to it being displayed on the screen for the user to read themselves and process. Then once the user repeats the word or phrase, the application processes their pronunciation with the use of AI and gives them a score for their accuracy. This way individuals with reading and writing disabilities can still hone their skills in a new language.

How we built it
We built the frontend UI using React, Javascript, HTML and CSS.

For the Backend we used Flask and used Python for writing two scripts. One where we designed an API to make use of Google cloud's speech to text feature and one to develop and LLM for generating prompts to the user.

Finally, for user authentication we made the use of Firebase.

Challenges we faced + What we learned
When you first open our web app, our homepage consists of a lot of information on our app and our target audience. From there the user needs to log in to their account. User authentication is where we faced our first major challenge. Third party integration took us significant time to test and debug.

Secondly, we struggled with generation for prompts for the user to repeat and using AI to implement that.

Accomplishments that we're proud of
This was the first time for many of our members to be integrating AI into an application that we are developing so that was a very rewarding experience especially since AI is the new big thing in the world of technology and it is here to stay.

We are also proud of the fact that we are developing an application for individuals with learning disabilities as we strongly believe that everyone has the right to education and their abilities should not discourage them from trying to learn new things.

What's next for ReadRight
As of now, ReadRight has the basics of the English language for users to study and get prompts from but we hope to integrate more languages and expand into a more widely used application. Additionally, we hope to integrate more features such as voice activated commands so that it is easier for the user to navigate the application itself.
