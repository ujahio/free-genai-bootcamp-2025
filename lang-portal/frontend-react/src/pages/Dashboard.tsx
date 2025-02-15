
const Dashboard = () => {
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6">
        <section className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Last Session</h2>
          <p className="text-muted-foreground">No sessions recorded yet.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
