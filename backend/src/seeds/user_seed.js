import "dotenv/config";

import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

const seedUsers = [
    ["seed_alex_chen", "Alex Chen", "alex.chen@example.com", "https://i.pravatar.cc/150?img=1"],
    ["seed_sam_taylor", "Sam Taylor", "sam.taylor@example.com", "https://i.pravatar.cc/150?img=2"],
    ["seed_jordan_lee", "Jordan Lee", "jordan.lee@example.com", "https://i.pravatar.cc/150?img=3"],
    ["seed_maya_patel", "Maya Patel", "maya.patel@example.com", "https://i.pravatar.cc/150?img=4"],
    [
        "seed_casey_morgan",
        "Casey Morgan",
        "casey.morgan@example.com",
        "https://i.pravatar.cc/150?img=5",
    ],
    ["seed_riley_kim", "Riley Kim", "riley.kim@example.com", "https://i.pravatar.cc/150?img=6"],
    [
        "seed_taylor_brooks",
        "Taylor Brooks",
        "taylor.brooks@example.com",
        "https://i.pravatar.cc/150?img=7",
    ],
    [
        "seed_jamie_wilson",
        "Jamie Wilson",
        "jamie.wilson@example.com",
        "https://i.pravatar.cc/150?img=8",
    ],
    ["seed_morgan_reed", "Morgan Reed", "morgan.reed@example.com", "https://i.pravatar.cc/150?img=9"],
    [
        "seed_avery_scott",
        "Avery Scott",
        "avery.scott@example.com",
        "https://i.pravatar.cc/150?img=10",
    ],
    [
        "seed_quinn_parker",
        "Quinn Parker",
        "quinn.parker@example.com",
        "https://i.pravatar.cc/150?img=11",
    ],
    ["seed_drew_hayes", "Drew Hayes", "drew.hayes@example.com", "https://i.pravatar.cc/150?img=12"],
    [
        "seed_skyler_evans",
        "Skyler Evans",
        "skyler.evans@example.com",
        "https://i.pravatar.cc/150?img=13",
    ],
    [
        "seed_harper_lane",
        "Harper Lane",
        "harper.lane@example.com",
        "https://i.pravatar.cc/150?img=14",
    ],
    [
        "seed_charlie_bennett",
        "Charlie Bennett",
        "charlie.bennett@example.com",
        "https://i.pravatar.cc/150?img=15",
    ],
    [
        "seed_emerson_gray",
        "Emerson Gray",
        "emerson.gray@example.com",
        "https://i.pravatar.cc/150?img=16",
    ],
    [
        "seed_finley_price",
        "Finley Price",
        "finley.price@example.com",
        "https://i.pravatar.cc/150?img=17",
    ],
    [
        "seed_rowan_blake",
        "Rowan Blake",
        "rowan.blake@example.com",
        "https://i.pravatar.cc/150?img=18",
    ],
    [
        "seed_sage_cooper",
        "Sage Cooper",
        "sage.cooper@example.com",
        "https://i.pravatar.cc/150?img=19",
    ],
    [
        "seed_reese_carter",
        "Reese Carter",
        "reese.carter@example.com",
        "https://i.pravatar.cc/150?img=20",
    ],
];

async function seedDatabase() {
    await connectDB();

    const result = await User.bulkWrite(
        seedUsers.map(([clerkId, fullName, email, profilePic]) => ({
            updateOne: {
                filter: { clerkId },
                update: {
                    $set: { clerkId, fullName, email, profilePic },
                },
                upsert: true,
            },
        })),
    );

    console.log(
        `Seeded users. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}, matched: ${result.matchedCount}`,
    );
}

seedDatabase()
    .catch((error) => {
        console.error("Failed to seed users:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.connection.close();
    });