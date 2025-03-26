import { featuredjobs } from '../shared/constants';
import logo from '../../src/assets/logo/logo-lifebonder.png';
import { useParams } from 'react-router-dom';
import hrImage from '../assets/hr.jpg';

const JobDetails = () => {
  const params = useParams();
  const jobId = Number(params.id);
  const jobDetail = featuredjobs.find(
    (featuredjob) => featuredjob.id === jobId
  );

  console.log(jobDetail);

  return (
    <>
      <main className="container mx-auto my-20 relative  sm:p-10">
        <div className="flex flex-wrap md:flex-nowrap items-center  w-full">
          <div className="mx-5 my-5">
            <img className="w-52" src={logo} alt="company logo" />
          </div>
          <div className="w-full  mx-5">
            <h1 className="sm:text-5xl text-xl my-3  font-semibold">
              {jobDetail?.title}
            </h1>
            {/* <div className="my-3 "> */}
            {jobDetail?.jobtype.map((type, i) => (
              <span key={i} className={` py-1 text-lg  rounded-full mx-1 }`}>
                {type}
              </span>
            ))}
            {/* </div> */}
          </div>
        </div>

        {/* <div className="border-t-2 border-b-2   mt-4"> */}
        <p className="sm:my-5 my-2 p-5">
          Salary <span className="font-semibold ">{jobDetail?.salary}</span>
        </p>
        {/* </div> */}

        <div className="flex justify-center md:flex-nowrap flex-wrap ">
          <div className="w-[1500px]">
            <div className="mt-5 p-5">
              <p>{jobDetail?.description}</p>
            </div>

            <div className="my-5 p-5">
              <h1 className="text-2xl font-semibold my-5">Experience</h1>
              <p>
                You have in-depth knowledge of managing systems, analyzing and
                extract mission critical information, and you like to
                participate in architecture and software development activities
                and take care of the release, deployment and security. You will
                help creating a comfortable environment for development.
              </p>

              <div>
                <h1 className="text-2xl font-semibold my-5">
                  Responsibilities
                </h1>
                <ul className="list-inside list-disc space-y-2">
                  <li>Take care of the release and deployment.</li>
                  <li>
                    Help the team with version controlling and proper security.
                  </li>
                  <li>
                    Develop and maintain mission-critical information
                    extraction, analysis, and manageing systems.
                  </li>
                  <li>
                    Implement streaming analysis algorithms to generate question
                    focused data sets (QFDs).
                  </li>
                  <li>
                    Provides direct and responsive support for urgent analytic
                    needs.
                  </li>
                  <li>
                    Participates in architecture and software development
                    activities.
                  </li>
                  <li>
                    Translates loosely defined requirements into solutions.
                  </li>
                  <li>
                    Uses open-source technologies and tools to accomplish
                    specific use cases encountered within the project.
                  </li>
                  <li>
                    Uses coding languages or scripting methodologies to solve a
                    problem with a custom workflow.
                  </li>
                  <li>
                    Collaborates with others on the project to brainstorm about
                    the best way to tackle a complex technological
                    infrastructure, security, or development problem.
                  </li>
                </ul>
              </div>

              <div>
                <h1 className="text-2xl font-semibold my-5">Skills</h1>
                <ul className="list-inside list-disc space-y-2">
                  <li>Good oral and written communication skills</li>
                  <li>Excellent problem-solving and troubleshooting skills</li>
                  <li>
                    Knowledge of best practices and IT operations in an
                    always-up, always-available service
                  </li>
                  <li>
                    Experience with or knowledge of Agile Software Development
                    methodologies
                  </li>
                  <li>Familiarity with container orchestration services </li>
                  <li>
                    Participates in architecture and software development
                    activities.
                  </li>
                  <li>
                    Familiarity with agile software development in Angular,
                    C/C++, JavaScript, TypeScript, Entity Framework, ASP.NET
                    Core
                  </li>
                  <li>
                    Experience administering and deploying development CI/CD
                    tools such as Git, Jira, GitLab, or Jenkins
                  </li>
                  <li>
                    Significant experience with Windows and Linux operating
                    system environments
                  </li>
                  <li>
                    Experience with infrastructure scripting solutions such as
                    PowerShell or Python
                  </li>
                </ul>
              </div>

              <div>
                <h1 className="text-2xl font-semibold my-5">What we offer</h1>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    We are a team of endlessly dedicated developers offering a
                    fun and friendly work environment where everyone is equal.
                  </li>
                  <li>
                    Awesome recommendations and when you’re ready to move on,
                    we’ve got your back.
                  </li>
                  <li>
                    We offer real-world work experience and exciting challenges
                    where you can make a real difference.
                  </li>
                  <li>Potential for Full-time hires at a later date.</li>
                </ul>
              </div>
            </div>
            <div>
              <p>
                {' '}
                For more information or questions please contact us at
                development@lifebonder.com
              </p>
            </div>
          </div>

          <div className=" p-5 rounded-lg w-full md:w-1/3 lg:w-1/2 sticky top-11  ">
            <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
            <form className="grid  gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="p-2 border bg-white  rounded"
              />
              <input
                type="text"
                placeholder="Surname"
                className="p-2 border bg-white rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 border bg-white  rounded"
              />
              <label className="block ">
                Upload CV:
                <input type="file" className="mt-1 w-full bg-white" />
              </label>
              <label className="block">
                Upload Other Documents:
                <input type="file" className="mt-1 w-full bg-white" multiple />
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>I agree to the terms and conditions</span>
              </label>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
                Submit Application
              </button>
            </form>

            <div className="mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-center w-full">
                <img
                  src={hrImage}
                  alt="contact person image here"
                  className="rounded-full w-32 mx-auto block"
                />
              </div>
              <div className="my-5">
                <h2 className="text-xl font-semibold">Contact Person</h2>
                <p className="font-medium">Greeshma Raj</p>
                <p className="text-gray-600">Human Resource Manager</p>
              </div>
            </div>

            <div className="mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mt-5">
                No time right now? Apply later!
              </h3>
              <p>We will send you a link to this job via email.</p>
              <input
                type="email"
                placeholder="E-mail Address"
                className="p-2 border rounded bg-white w-full mt-3"
              />
              <button className="mt-3 bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-500">
                Send me the link
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default JobDetails;
