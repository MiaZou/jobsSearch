import React from 'react';
import Typography from '@material-ui/core/Typography';

import Job from './Job';
import JobModal from './JobModal';

import { MobileStepper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// still using html for title under the hood, but the variant will make it h4 stylistically. 

export default function Jobs({jobs}) {
  React.useEffect(() => {
    const welcomeItem = document.querySelectorAll('.welcome-item');
    let delay = 0;
    welcomeItem.forEach(item => {
      setTimeout(() => item.style.opacity = 1, delay);
      delay += 500;
    })
  }, []);

  // modal
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // pagination
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs/50);
  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice(activeStep*50, (activeStep*50)+51);

  // step == 0, show 0 - 49;
  // step == 1, show 50 - 99;

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c>0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c-c/8);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  

  return (
    <div className="jobs">
      <JobModal open={open} job={selectedJob} handleClose={handleClose} />
      <Typography variant="h4" component="h1">
        Entry Level Software Jobs
      </Typography>
      <Typography variant="h6" component="h2">
        Found {numJobs} Jobs
      </Typography>
      {
        jobsOnPage.map(
          (job, i) => <Job key={i} job={job} onClick={() => {
            handleClickOpen();
            selectJob(job)
          }} />
        )
      }
      <MobileStepper
        steps={numPages}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}