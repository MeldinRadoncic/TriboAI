import { auth, currentUser } from "@clerk/nextjs";
import tribodb from "@/postgresql/connectDB";
import { MAX_FREE_COUNTS } from "@/constants";

// Function to increment the count of API calls for a user
export const increaseAPILimit = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) return;

  const userApiLimit = await tribodb.query(
    `SELECT * FROM userapilimit WHERE userId = $1`,
    [user.id]
  );

  if (userApiLimit.rows.length > 0) {
    await tribodb.query(
      `UPDATE userapilimit SET count = count + 1 WHERE userId = $1`,
      [user.id]
    );
  } else {
    await tribodb.query(
      `INSERT INTO userapilimit (userId, count, name, email) VALUES ($1, $2, $3, $4)`,
      [user.id, 1, user?.firstName + " " + user?.lastName, user?.emailAddresses[0]?.emailAddress]
    );
  }
};

// Function to check if the user has exceeded the API limit
export const checkAPILimit = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) return false;

  const userApiLimit = await tribodb.query(
    `SELECT * FROM userapilimit WHERE userId = $1`,
    [user.id]
  );
// // FIXME: START HERE
//   if (userApiLimit.rows.length > 0) {
//     const { count, name } = userApiLimit.rows[0];
//     return count === MAX_FREE_COUNTS && name === "Meldin Radoncic" && email === "meldinradoncic89@gmail.com";
  // } else {
  //   return false;
  // }

  if(userApiLimit.rows.length > 0){
    const { count } = userApiLimit.rows[0];
    if(count < MAX_FREE_COUNTS){
      return true
  }else{
    return false
  }
};
}

// Fetch the user's API Limit Count
export const getAPILimitCount = async () => {
  const { userId } = auth();
  const user = await currentUser();

  const checkUser = await tribodb.query(
    `SELECT * FROM userapilimit WHERE userId = $1`,
    [user.id]
  );

   if(checkUser.rows.length === 0){
    await tribodb.query(
      `INSERT INTO userapilimit (userId, count, name, email) VALUES ($1, $2, $3, $4)`,
      [user.id, 0, user.firstName + " " + user.lastName, user.emailAddresses[0].emailAddress]
    );

   }

  if (!userId) return 0;

  const userApiLimit = await tribodb.query(
    `SELECT count FROM userapilimit WHERE userId = $1`,
    [user.id]
  );

  if (userApiLimit.rows.length > 0) {
    
    return userApiLimit.rows[0].count;
  } else {
      return 0
       
  }
};
