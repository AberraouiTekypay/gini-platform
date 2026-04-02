const app = require('./app');
const { sequelize } = require('./models');
const EodSweep = require('./services/EodSweep');

const PORT = process.env.PORT || 5000;

// Only call app.listen() after sequelize.sync()
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Start End-of-Day Cron Jobs
    EodSweep.startCron();
  });
});
