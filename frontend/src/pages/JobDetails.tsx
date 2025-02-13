import { featuredjobs } from '../shared/constants';
import logo from '../../src/assets/logo/logo-lifebonder.png';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const params = useParams();
  const jobId = Number(params.id);
  const jobDetail = featuredjobs.find(
    (featuredjob) => featuredjob.id === jobId
  );

  console.log(jobDetail);

  return (
    <main className="container mx-auto my-20 sm:w-[1000px]  sm:p-10">
      <div className="flex flex-wrap sm:flex-nowrap items-center  w-full">
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
      <div className="border-t-2 border-b-2   mt-4">
        <p className="sm:my-5 my-2 p-5">
          Salary <span className="font-semibold ">{jobDetail?.salary}</span>
        </p>
      </div>
      <div className="mt-5 p-5">
        <p>{jobDetail?.description}</p>
      </div>

      <div className="my-5 p-5">
        <h1 className="text-2xl font-semibold my-5">Experience</h1>
        <p>
          You have in-depth knowledge of managing systems, analyzing and extract
          mission critical information, and you like to participate in
          architecture and software development activities and take care of the
          release, deployment and security. You will help creating a comfortable
          environment for development.
        </p>

        <div>
          <h1 className="text-2xl font-semibold my-5">Responsibilities</h1>
          <ul className="list-inside list-disc space-y-2">
            <li>Take care of the release and deployment.</li>
            <li>Help the team with version controlling and proper security.</li>
            <li>
              Develop and maintain mission-critical information extraction,
              analysis, and manageing systems.
            </li>
            <li>
              Implement streaming analysis algorithms to generate question
              focused data sets (QFDs).
            </li>
            <li>
              Provides direct and responsive support for urgent analytic needs.
            </li>
            <li>
              Participates in architecture and software development activities.
            </li>
            <li>Translates loosely defined requirements into solutions.</li>
            <li>
              Uses open-source technologies and tools to accomplish specific use
              cases encountered within the project.
            </li>
            <li>
              Uses coding languages or scripting methodologies to solve a
              problem with a custom workflow.
            </li>
            <li>
              Collaborates with others on the project to brainstorm about the
              best way to tackle a complex technological infrastructure,
              security, or development problem.
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-2xl font-semibold my-5">Skills</h1>
          <ul className="list-inside list-disc space-y-2">
            <li>Good oral and written communication skills</li>
            <li>Excellent problem-solving and troubleshooting skills</li>
            <li>
              Knowledge of best practices and IT operations in an always-up,
              always-available service
            </li>
            <li>
              Experience with or knowledge of Agile Software Development
              methodologies
            </li>
            <li>Familiarity with container orchestration services </li>
            <li>
              Participates in architecture and software development activities.
            </li>
            <li>
              Familiarity with agile software development in Angular, C/C++,
              JavaScript, TypeScript, Entity Framework, ASP.NET Core
            </li>
            <li>
              Experience administering and deploying development CI/CD tools
              such as Git, Jira, GitLab, or Jenkins
            </li>
            <li>
              Significant experience with Windows and Linux operating system
              environments
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
              We are a team of endlessly dedicated developers offering a fun and
              friendly work environment where everyone is equal.
            </li>
            <li>
              Awesome recommendations and when you’re ready to move on, we’ve
              got your back.
            </li>
            <li>
              We offer real-world work experience and exciting challenges where
              you can make a real difference.
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
    </main>
  );
};

export default JobDetails;
