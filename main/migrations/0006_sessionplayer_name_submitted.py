# Generated by Django 4.0.4 on 2022-05-17 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_parametersetplayer_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='sessionplayer',
            name='name_submitted',
            field=models.BooleanField(default=False, verbose_name='Name submitted'),
        ),
    ]