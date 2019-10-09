# Generated by Django 2.0.1 on 2018-01-31 12:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('taggit', '0002_auto_20150616_2121'),
    ]

    operations = [
        migrations.CreateModel(
            name='Basket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150)),
                ('rating', models.IntegerField(default=0)),
                ('description', models.CharField(blank=True, max_length=2000)),
                ('views', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Coin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150)),
                ('ticker', models.CharField(blank=True, max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('basket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exchange.Basket')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.IntegerField(choices=[(0, 'Free'), (1, 'Admin'), (2, 'Premium')], default=0)),
                ('points', models.IntegerField(default=0)),
                ('favorites', models.ManyToManyField(blank=True, to='exchange.Basket')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150)),
                ('description', models.CharField(blank=True, max_length=2000)),
                ('tags', taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
        ),
        migrations.AddField(
            model_name='like',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exchange.Profile'),
        ),
        migrations.AddField(
            model_name='basket',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exchange.Profile'),
        ),
        migrations.AddField(
            model_name='basket',
            name='sector',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='exchange.Sector'),
        ),
        migrations.AddField(
            model_name='basket',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AddField(
            model_name='basket',
            name='underlying',
            field=models.ManyToManyField(blank=True, to='exchange.Coin'),
        ),
    ]