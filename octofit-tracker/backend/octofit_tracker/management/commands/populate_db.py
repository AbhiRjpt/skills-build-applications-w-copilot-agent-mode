from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Banner', email='bruce@marvel.com', team=marvel)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)
        diana = User.objects.create(name='Diana Prince', email='diana@dc.com', team=dc)
        barry = User.objects.create(name='Barry Allen', email='barry@dc.com', team=dc)

        # Create activities
        Activity.objects.create(user=tony, type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=steve, type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=bruce, type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user=clark, type='Flying', duration=120, date=timezone.now().date())
        Activity.objects.create(user=diana, type='Archery', duration=50, date=timezone.now().date())
        Activity.objects.create(user=barry, type='Sprinting', duration=15, date=timezone.now().date())

        # Create workouts
        w1 = Workout.objects.create(name='Pushups', description='Do 20 pushups')
        w2 = Workout.objects.create(name='Situps', description='Do 30 situps')
        w3 = Workout.objects.create(name='Plank', description='Hold plank for 1 minute')
        w1.suggested_for.set([tony, steve, bruce])
        w2.suggested_for.set([clark, diana, barry])
        w3.suggested_for.set([tony, clark])

        # Create leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=bruce, score=80)
        Leaderboard.objects.create(user=clark, score=110)
        Leaderboard.objects.create(user=diana, score=95)
        Leaderboard.objects.create(user=barry, score=85)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
