const affectedGlobalGroups = [
  "accounts-manager",
  "system-manager"
];

const newGlobalPermissions = [
  "reaction:legacy:invitations/read"
];

/**
 * @summary Performs migration up from previous data version
 * @param {Object} context Migration context
 * @param {Object} context.db MongoDB `Db` instance
 * @param {Function} context.progress A function to report progress, takes percent
 *   number as argument.
 * @return {undefined}
 */
async function up({ db, progress }) {
  progress(0);

  await db.collection("Groups").updateMany({
    slug: { $in: affectedGlobalGroups }
  }, {
    $addToSet: { permissions: { $each: newGlobalPermissions } }
  });

  progress(100);
}

export default {
  down: "impossible",
  up
};
