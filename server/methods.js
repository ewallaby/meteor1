const getName = (user) => {
    let name = '';
    if (user.profile && user.profile.firstName) {
        name += user.profile.firstName;
    }
    if (user.profile && user.profile.lastName) {
        name += ` ${user.profile.lastName}`;
    } else if (user.emails && name.trim().length < 1) {
        const address = user.emails[0].address;
        name = address.split("@")[0];
    }
    return name;
}
Meteor.methods({
    addTeamMember: (team, user) => {
        user = {_id: user.__originalId, name: getName(user)};
        return Teams.update(
            {_id: team._id},
            { $push: { members: user }
        });
    },
    removeTeamMember: (team, user) => {
        user = user.__originalId ? {_id: user.__originalId} : user;
        return Teams.update(
            {_id: team._id},
            { $pull: { members: user }
        });
    },
})