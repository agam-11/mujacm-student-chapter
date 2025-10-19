import cron from 'node-cron';
import axios from 'axios';

/**
 * Keep-alive job: Ping the server every 10 minutes to prevent sleep
 */
const keepAliveJob = cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get(`${process.env.KEEP_ALIVE_URL || 'http://localhost:5000'}/health`, {
      timeout: 5000
    });
    console.log(`✓ [${new Date().toISOString()}] Keep-alive ping successful`);
  } catch (error) {
    console.error(`✗ [${new Date().toISOString()}] Keep-alive ping failed:`, error.message);
  }
});

/**
 * Start all cron jobs
 */
export const startCronJobs = () => {
  console.log('✓ Cron jobs initialized');
  console.log('  - Keep-alive job: Every 10 minutes');
  
  return {
    keepAliveJob
  };
};

/**
 * Stop all cron jobs (optional)
 */
export const stopCronJobs = () => {
  keepAliveJob.stop();
  console.log('✓ All cron jobs stopped');
};
