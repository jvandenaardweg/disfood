'use strict'

module.exports = function (sequelize, DataTypes) {
  var RecipesLabels = sequelize.define('recipesLabels', {
    // (confidence) Overall score of the result. Range [0, 1].
    score: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    // The relevancy of the ICA (Image Content Annotation) label to the image. For example, the relevancy of "tower" is likely higher to an image containing the detected "Eiffel Tower" than to an image containing a detected distant towering building, even though the confidence that there is a tower in each image may be the same. Range [0, 1].
    topicality: {
      type: DataTypes.DECIMAL, // Nederlands, English, Deutsch
      allowNull: false
    }
  })

  return RecipesLabels
}
