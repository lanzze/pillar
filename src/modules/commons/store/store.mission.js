import missions from "../../../config/mission";

export const state = {
  jobs: null
};

export const actions = {
  "mission.register": (context, items = missions) => {
    if (context.state.jobs) {
      context.state.jobs.forEach(job => job.cancel());
    }

    let config = {silent: true};
    let model = {user: context.rootState.user};

    let executor = (job) => {
      let start = Date.now();

      if (job.source) {
        context.dispatch("request", Object.assign({
          model: model,
          config: config,
          method: "post"
        }, job.source)).then(data => {
          if (job.execute) {
            return job.execute(context, data, start);
          }
          context.commit("SET", {key: job.key, data: data});
        });
      } else if (job.execute) {
        job.execute(context, null, start);
      }
    };

    context.state.jobs = Object.seal(missions.filter(e => e.disabled !== true)
        .map(job => {
          if (job.immediate) executor(job);
          if (job.rule) {
            return schedule.scheduleJob(job.rule, function () {
              return executor(job);
            });
          }
        }).filter(job => !!job)
    );
  }
}
