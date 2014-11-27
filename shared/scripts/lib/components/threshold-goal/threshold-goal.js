'use strict';

import Component from '../../component';
import storage from '../../storage';

function ThresholdGoalComponent() {
  Component.prototype.constructor.apply(this, arguments);
}

ThresholdGoalComponent.prototype = {
  template: 'components/threshold-goal/threshold-goal.html',

  events: {
    'keyup input': 'filterInput',
    'blur input': 'formatAndSave',
    'change input': 'formatAndSave'
  },

  filterInput: function(ev) {
    var val = ev.target.value.replace(/[^0-9.]/g, '');
    this.$('input').val('$' + val);
  },

  formatAndSave: function(ev) {
    var val = ev.target.value.replace(/[^0-9.]/g, '');
    var currency = '$' + parseFloat(val).toFixed(2);

    this.$('input').val(currency);

    storage.get('settings').then(function(settings) {
      settings.thresholdGoal = currency;
      return storage.set('settings', settings);
    });
  },

  afterRender: function() {
    var input = this.$('input');

    storage.get('settings').then(function(settings) {
      input.val(settings.thresholdGoal);
    });
  }
};

ThresholdGoalComponent.prototype.__proto__ = Component.prototype;

export default ThresholdGoalComponent;
