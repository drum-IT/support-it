const express = require("express");
const incidentRouter = express.Router();

const incidents = [];

const findIncident = number => {
  for (let i = 0; i < incidents.length; i++) {
    if (incidents[i].number === number) {
      return incidents[i];
    }
  }
};

incidentRouter.get("/", (req, res, next) => {
  res.status(200).send({ message: "Sending Incidents", incidents: incidents });
});

incidentRouter.post("/", (req, res, next) => {
  const newIncident = req.body.incident;
  newIncident.number = 1000000 + incidents.length;
  incidents.push(newIncident);
  res.status(201).send({
    message: `incident ${newIncident.number} created!`,
    incident: newIncident
  });
});

incidentRouter.put("/:number", (req, res, next) => {
  console.log(req.body);
  let incident = req.body.incident
  for (let i = 0; i < incidents.length; i++) {
    if (incidents[i].number === incident.number) {
      incidents[i].title = incident.title;
      incidents[i].note = incident.note;
      incidents[i].category = incident.category;
      incident = incidents[i];
    }
  }
  res.status(200).send({ message: `incident updated!`, incident: incident });
});

module.exports = incidentRouter;
