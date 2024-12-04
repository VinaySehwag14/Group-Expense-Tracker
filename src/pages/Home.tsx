import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "Effortless Expense Tracking",
      description: "Split expenses equally or customize for your group.",
      image: "/images/money.svg",
    },
    {
      title: "Group Management Made Easy",
      description: "Create, manage, and collaborate in groups seamlessly.",
      image: "/images/team.svg",
    },
    {
      title: "Share with WhatsApp",
      description: "Send expense summaries directly to your group.",
      image: "/images/whatsapp.svg",
    },
  ];

  const futureFeatures = [
    "AI-powered expense suggestions.",
    "Bank account integrations.",
    "Export reports to PDF/Excel.",
    "Multi-language support.",
    "Integration with Google Contacts.",
  ];

  return (
    <div className="mx-auto w-full max-w-7xl mt-5">
      {/* Hero Section */}
      <aside className="relative overflow-hidden text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 sm:mx-16 mx-2 sm:py-16 py-10">
        <div className="relative z-10 px-4 pb-20 pt-10 sm:py-24 mx-auto text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Simplify Your Group Expenses
          </h2>
          <p className="mt-4 text-lg">
            Track and split expenses with ease. Perfect for trips, parties, and
            more.
          </p>
          <div className="mt-8">
            <Link
              className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-600 rounded-lg hover:opacity-80"
              to="/"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://i.ibb.co/5BCcDYB/Remote2.png"
            alt="Hero Background"
          />
        </div>
      </aside>

      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Key Features of Our App
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
              className="bg-white p-6 shadow-md rounded-lg text-center"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Features Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Future Feature Plans
        </h2>
        <div className="relative max-w-4xl mx-auto">
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="bg-white p-4 shadow-md rounded-lg mb-4 text-center"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
