import Badge from 'discourse/models/badge';
import { mapRoutes } from 'discourse/mapping-router';

moduleFor('controller:admin-user-badges', {
  beforeEach() {
    this.registry.register('router:main', mapRoutes());
  },
  needs: ['controller:adminUser']
});

QUnit.test("grantableBadges", function(assert) {
  const badgeFirst = Badge.create({id: 3, name: "A Badge", enabled: true});
  const badgeMiddle = Badge.create({id: 1, name: "My Badge", enabled: true});
  const badgeLast = Badge.create({id: 2, name: "Zoo Badge", enabled: true});
  const badgeDisabled = Badge.create({id: 4, name: "Disabled Badge", enabled: false});
  const controller = this.subject({ model: [], badges: [badgeLast, badgeFirst, badgeMiddle, badgeDisabled] });
  const sortedNames = [badgeFirst.name, badgeMiddle.name, badgeLast.name];
  const badgeNames = controller.get('grantableBadges').map(function(badge) {
    return badge.name;
  });


  assert.not(badgeNames.includes(badgeDisabled), "excludes disabled badges");
  assert.deepEqual(badgeNames, sortedNames, "sorts badges by name");
});
