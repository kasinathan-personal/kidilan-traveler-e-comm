import React from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ImageWithFallback";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const KidilanTraveller = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {/* Hero Intro */}
      <section className="relative h-[80vh] md:h-[88vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-of-backwaters-9950/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" />
        <div className="relative container max-w-6xl mx-auto h-full flex items-end pb-12">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-black/70 backdrop-blur text-sm">
              A Malayali on the move
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-black/70 leading-[1.05] mt-4">
              Kidilan Traveller
            </h1>
            <p className="max-w-2xl mt-3 text-slate-100 text-black/70">
              From Kerala backwaters to coast-to-coast drives in the United
              States — a cinematic journey of humor, flavors, and human
              connection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Leap */}
      <section className="container max-w-6xl mx-auto py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="relative rounded-2xl overflow-hidden shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1589983846997-04788035bc83?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Kerala Backwaters"
              className="w-full h-72 md:h-96 object-cover"
            />
            <div className="absolute top-3 left-3 bg-white/90 rounded px-3 py-1 text-sm">
              Kerala
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="New York"
              className="w-full h-72 md:h-96 object-cover"
            />
            <div className="absolute top-3 left-3 bg-white/90 rounded px-3 py-1 text-sm">
              New York
            </div>
          </div>
        </motion.div>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 text-slate-700 max-w-3xl mx-auto text-center"
        >
          The leap. A one-way ticket, a head full of dreams, and a suitcase with{" "}
          <em>porotta energy</em>. From the familiar coconut trees to a skyline
          of new possibilities.
        </motion.p>
      </section>

      {/* The Open Road - horizontal scroll with animated route */}
      <section className="relative py-16 bg-slate-50">
        <div className="container max-w-6xl mx-auto mb-6 text-center">
          <h2 className="font-display text-3xl">The Open Road</h2>
          <p className="text-slate-600">
            Deserts, snow peaks, diners and gas stations — every mile a new
            story.
          </p>
        </div>
        <div className="overflow-x-auto flex items-center justify-center">
          <div className="flex gap-6 min-w-max px-20">
            {[
              "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1465310477141-6fb93167a273?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <motion.div
                key={i}
                className="w-[320px] md:w-[420px] shrink-0 rounded-2xl overflow-hidden shadow"
              >
                <ImageWithFallback
                  src={src}
                  alt="road"
                  className="w-full h-56 md:h-72 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="container max-w-6xl mx-auto mt-10">
          <div className="relative h-28 md:h-36">
            <svg
              viewBox="0 0 800 120"
              className="absolute inset-0 w-full h-full"
            >
              <motion.path
                d="M10 100 C 200 20, 400 20, 600 100 S 780 100, 790 40"
                fill="transparent"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* The Sights & Secrets */}
      <section className="container max-w-6xl mx-auto py-16">
        <h2 className="font-display text-3xl text-center mb-8">
          The Sights & Secrets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl overflow-hidden shadow relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1400&auto=format&fit=crop"
              alt="Statue of Liberty"
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 rounded px-3 py-1 text-sm">
              Iconic
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1400&auto=format&fit=crop"
              alt="Hidden bookstore"
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 rounded px-3 py-1 text-sm">
              Hidden Gem
            </div>
          </div>
        </div>
      </section>

      {/* The Flavors */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-6xl mx-auto text-center mb-8">
          <h2 className="font-display text-3xl">The Flavors of the Road</h2>
          <p className="text-slate-600">
            From clam chowder to gumbo — and a cheeky comparison to Kerala
            classics.
          </p>
        </div>
        <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: "Boston Clam Chowder",
              img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
              tip: "Creamy, cozy, perfect for cold walks by the harbor.",
            },
            {
              name: "Texas BBQ",
              img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop",
              tip: "Smoky brisket and ribs — a carnivore’s dream.",
            },
            {
              name: "Louisiana Gumbo",
              img: "https://images.unsplash.com/photo-1560672177-99a04f67335b?q=80&w=1200&auto=format&fit=crop",
              tip: "Soulful stew with spice and history.",
            },
            {
              name: "Philly Cheesesteak",
              img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
              tip: "Greasy, glorious — Kerala beef fry’s American cousin.",
            },
          ].map((f, i) => (
            <Tooltip key={i} title={f.tip} arrow>
              <div className="rounded-2xl overflow-hidden shadow bg-white">
                <ImageWithFallback
                  src={f.img}
                  alt={f.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-sm font-medium">{f.name}</div>
              </div>
            </Tooltip>
          ))}
        </div>
      </section>

      {/* The Heart of It All */}
      <section className="container max-w-6xl mx-auto py-16">
        <h2 className="font-display text-3xl text-center mb-8">
          The Heart of It All
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "https://videos.pexels.com/video-files/5319856/5319856-uhd_2560_1440_25fps.mp4",
            "https://videos.pexels.com/video-files/855326/855326-uhd_2560_1440_25fps.mp4",
            "https://videos.pexels.com/video-files/855199/855199-uhd_2560_1440_24fps.mp4",
          ].map((src, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow bg-black"
            >
              <video
                className="w-full h-56 object-cover"
                muted
                loop
                playsInline
              >
                <source src={src} type="video/mp4" />
              </video>
              <div className="p-3 text-white/90 text-sm flex items-center gap-2">
                <PlayArrowIcon fontSize="small" /> Moments with strangers who
                felt like friends
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Journey Continues */}
      <section className="relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop"
          alt="Coast"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        <div className="container max-w-6xl mx-auto -mt-24 relative pb-16">
          <div className="bg-white rounded-2xl shadow p-6 md:p-10 text-center">
            <h3 className="font-display text-3xl">The Journey Continues</h3>
            <p className="text-slate-600 max-w-2xl mx-auto mt-2">
              More destinations ahead, more flavors to taste, and more stories
              to tell. Join me on the next adventure — every mile, every smile,
              every ‘Kidilan’ moment.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="contained" component={Link} to="/shop">
                Shop the Journey
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KidilanTraveller;
