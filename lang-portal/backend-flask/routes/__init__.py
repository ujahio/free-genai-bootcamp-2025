from .words import load as load_words
from .groups import load as load_groups
from .study_sessions import load as load_study_sessions
from .dashboard import load as load_dashboard
from .study_activities import load as load_study_activities

def load(app):
    load_words(app)
    load_groups(app)
    load_study_sessions(app)
    load_dashboard(app)
    load_study_activities(app) 