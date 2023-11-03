import PropTypes from 'prop-types';

const EventCollapse = ({ children, title }) => {
  return (
    <details className="collapse bg-base-200 collapse-arrow">
      <summary className="collapse-title text-xl font-medium">
        {title}
      </summary>
      <div className="collapse-content">
        {children}
      </div>
    </details>
  );
};

export default EventCollapse;

EventCollapse.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
