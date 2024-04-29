require("dotenv").config();
const express = require("express");
const path = require("path");
const State = require("./model/stateTable");
const LGA = require("./model/lgaTable");
const Party = require("./model/partyTable");
const PollingUnit = require("./model/pollingUnitTable");
const Ward = require("./model/wardTable");
const PollingUnitResult = require("./model/pollingUnitResult");
const LgaResult = require("./model/lgaResults");
const { Op } = require("sequelize");

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  var unitResults = await PollingUnit.findAll({});
  return res.render("Home", { unitResults });
});

// Results for individual polling unit
app.get("/result/polling-unit/:id", async (req, res) => {
  var pollingUnitId = req.params.id;

  var pollingUnit = await PollingUnit.findOne({
    where: {
      uniqueid: parseInt(pollingUnitId),
    },
  });

  console.log(pollingUnit);
  if (!pollingUnit)
    return res.render("Error", {
      error: { title: "NOT FOUND", detail: "Polling unit not found" },
    });

  // Find polling unit results by id
  var unitResults = await PollingUnitResult.findAll({
    where: {
      polling_unit_uniqueid: `${pollingUnitId}`,
    },
  });

  return res.render("PollingUnitDetail", { unitResults, pollingUnit });
});

// Get summed results of the results per LGA
app.get("/total/lga", async (req, res) => {
  var lgaId = parseInt(req.query.id);

  var lgaList = await LGA.findAll({});

  // Find the polling units of that lga
  var pollingUnits = await PollingUnit.findAll({
    where: {
      lga_id: lgaId || lgaList[0]?.lga_id,
    },
  });

  // Get the polling unit ids
  var pollingUnitIds = pollingUnits.map((unit) => `${unit.polling_unit_id}`);

  // Get the polling unit results
  var pollingResults = await PollingUnitResult.findAll({
    where: {
      polling_unit_uniqueid: {
        [Op.in]: pollingUnitIds,
      },
    },
  });

  var result = {
    lga_id: pollingUnits[0]?.lga_id,
    lga_name:
      req.query.id != null
        ? lgaList.find((x) => x.lga_id == lgaId).lga_name
        : lgaList[0]?.lga_name,
    total: pollingResults.reduce((acc, next) => acc + next.party_score, 0),
  };

  //res.json(result);
  return res.render("TotalPolling", { lgaList, result });
});

app.get("/store", async (req, res) => {
  var pollingUnits = await PollingUnit.findAll();
  var parties = await Party.findAll();

  return res.render("StoreResult", { pollingUnits, parties });
});

// Display a page to store results
app.post("/results/store", async (req, res) => {
  var pollingUnitId = req.body.pollingUnitId;

  var pollingUnit = await PollingUnit.findOne({
    where: {
      uniqueid: pollingUnitId,
    },
  });

  if (!pollingUnit)
    return res.render("Error", {
      error: { title: "NOT FOUND", detail: "Polling unit not found" },
    });

  var partyId = req.body.partyId;
  var party = await Party.findOne({
    where: {
      id: partyId,
    },
  });

  if (!party)
    return res.render("Error", {
      error: { title: "NOT FOUND", detail: "Party not found" },
    });

  try {
    await PollingUnitResult.create({
      polling_unit_uniqueid: pollingUnit.uniqueid,
      party_abbreviation: party.partyid,
      party_score: req.body.score,
      entered_by_user: req.body.user,
      date_entered: Date.now(),
      user_ip_address: req.ip,
    });
  } catch (err) {
    return res.render("Error", {
      error: { title: "NOT FOUND", detail: "Polling unit not found" },
    });
  }

  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`APP LISTENING ON PORT ${port}`);
});
