import { useSearchParams } from "react-router-dom";

import SleepForm from "../forms/sleepForm";
import FeedForm from "../forms/feedForm";
import DiaperForm from "../forms/diaperForm";
import EditForm from "../forms/editForm";

import Home from "./Home";

export default function Form() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (id) {
    return <EditForm type={type} id={id} />;
  }

  switch (type) {
    case "sleep":
      return <SleepForm />;
    case "diaper":
      return <DiaperForm />;
    case "eat":
      return <FeedForm />;
    default:
      return <Home />;
  }
}
