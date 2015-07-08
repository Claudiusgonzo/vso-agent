
import scmm = require('./lib/scmprovider');
import gitm = require('./git');
import ctxm = require('../context');
import ifm = require('../api/interfaces');

export function getProvider(ctx: ctxm.JobContext, targetPath: string): scmm.IScmProvider {
	return new GitTfsScmProvider(ctx, targetPath);
}

export class GitTfsScmProvider extends gitm.GitScmProvider {

	// override since TfsGit uses the generated OAuth token
	public initialize(endpoint: ifm.JobEndpoint) {
		this.endpoint = endpoint;
		
	    if (endpoint.authorization && endpoint.authorization['scheme']) {
	        var scheme = endpoint.authorization['scheme'];
	        this.ctx.info('Using auth scheme: ' + scheme);

	        switch (scheme) {
	            case 'OAuth':
	                this.username = 'OAuth';
	                this.password = endpoint.authorization['parameters']['AccessToken'];
	                break;

	            default:
	                this.ctx.warning('invalid auth scheme: ' + scheme);
	        }
	    }		
	}


}