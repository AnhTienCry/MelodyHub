import { Card } from '../../../components';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%' },
    { title: 'Total Songs', value: '5,678', change: '+8%' },
    { title: 'Active Sessions', value: '89', change: '+23%' },
    { title: 'Revenue', value: '$12,345', change: '+15%' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <p className="text-primary text-sm mt-1">{stat.change} from last month</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div>
                  <p className="text-white">User activity {item}</p>
                  <p className="text-gray-400 text-sm">2 minutes ago</p>
                </div>
                <span className="text-primary">View</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-white mb-4">Top Songs</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div>
                  <p className="text-white">Song Title {item}</p>
                  <p className="text-gray-400 text-sm">Artist Name</p>
                </div>
                <span className="text-gray-400">1.2K plays</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
